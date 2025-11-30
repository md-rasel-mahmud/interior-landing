import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISetting extends Document {
  title: string;
  logo: string;
  favicon: string;
  metaDescription: string;
  metaKeywords: string[];
  banner: {
    title: {
      prefix: string;
      highlight: string;
    };
    description: string;
    bannerImage: string;
    hasOffer: boolean;
    offer?: {
      title: string;
      description: string;
      amount: number;
    };
  };
  about: {
    badge: string;
    title: {
      prefix: string;
      highlight: string;
    };
    description: string;
    features: string[];
    image: string;
  };
  footer: {
    title: string;
    description: string;
    footerLogo: string;
    quickLinks: {
      name: string;
      url: string;
    }[];
  };
  socials: {
    icon: string;
    url: string;
    title: string;
  }[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}

const SettingSchema: Schema = new Schema<ISetting>(
  {
    title: { type: String, required: true },
    logo: { type: String, required: true },
    favicon: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeywords: { type: [String], required: true },
    banner: {
      title: {
        prefix: { type: String, required: true },
        highlight: { type: String, required: true },
      },
      description: { type: String, required: true },
      bannerImage: { type: String, required: true },
      hasOffer: { type: Boolean, default: false },
      offer: {
        title: { type: String, required: false },
        description: { type: String, required: false },
        amount: { type: Number, required: false },
      },
    },
    about: {
      badge: { type: String, required: true },
      title: {
        prefix: { type: String, required: true },
        highlight: { type: String, required: true },
      },
      description: { type: String, required: true },
      features: [{ type: String, required: true }],
      image: { type: String, required: true },
    },
    footer: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      footerLogo: { type: String, required: true },
      quickLinks: [
        {
          name: { type: String, required: true },
          url: { type: String, required: true },
        },
      ],
    },
    socials: [
      {
        icon: { type: String, required: true },
        url: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    contact: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Setting: Model<ISetting> =
  mongoose.models.Setting || mongoose.model<ISetting>("Setting", SettingSchema);

export { Setting };
