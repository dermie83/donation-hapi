import { Donation } from "../../types/donation-types.js";
import { DonationMongoose } from "./donation.js";

export const donationStore = {
  async find(): Promise<Donation[]> {
    const donations = await DonationMongoose.find().populate("donor").populate("candidate").lean();
    donations.forEach((donation) => {
      // @ts-ignore
      donation.donor = `${donation.donor.firstName} ${donation.donor.lastName}`;
    });
    return donations;
  },

  async findBy(id: string): Promise<Donation | null> {
    const donation = await DonationMongoose.findOne({ lighthouse: id });
    if (!donation) {
      return null;
    }
    return donation;
  },

  async getDonationById(id:string) {
    if (id) {
      const donation = await DonationMongoose.findOne({ _id: id }).lean();
      return donation;
    }
    return null;
  },

  async add(donation: Donation): Promise<Donation | null> {
    let newDonation = new DonationMongoose({ ...donation });
    await newDonation.save();
    return newDonation;
  },

  async delete() {
    await DonationMongoose.deleteMany({});
  },

  async deleteDonation(id:string) {
    try {
      await DonationMongoose.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
    }
  },

  async updateDonation(id:string, updatedDonation:Donation) {
    const donation = await DonationMongoose.findOne({ _id: id });
    donation.amount = updatedDonation.amount;
    // group.img = updatedGroup.img;
    await donation.save();
  },
};