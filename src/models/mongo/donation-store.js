import { DonationMongoose } from "./donation.js";

export const donationStore = {
    async find() {
        const donations = await DonationMongoose.find().populate("donor").populate("lighthouse").lean();
        donations.forEach((donation) => {
            // @ts-ignore
            donation.donor = `${donation.donor.firstName} ${donation.donor.lastName}`;
        });
        return donations;
    },
    async findBy(id) {
        const donation = await DonationMongoose.findOne({ lighthouse: id });
        if (!donation) {
            return null;
        }
        return donation;
    },
    async add(donation) {
        const newDonation = new DonationMongoose({ ...donation });
        await newDonation.save();
        return newDonation;
    },
    async delete() {
        await DonationMongoose.deleteMany({});
    },

    async deleteDonation(id) {
        try {
          await DonationMongoose.deleteOne({ _id: id });
        } catch (error) {
          console.log("bad id");
        }
    },
    async getDonationById(id) {
        if (id) {
          const donation = await DonationMongoose.findOne({ _id: id }).lean();
          return donation;
        }
        return null;
      },
    
      async updateDonation(id, updatedDonation) {
        const donation = await DonationMongoose.findOne({ _id: id });
        donation.amount = updatedDonation.amount;
        // group.img = updatedGroup.img;
        await donation.save();
      },
      
};
