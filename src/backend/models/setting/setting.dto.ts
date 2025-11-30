import z from "zod";

const SETTING_DEFAULT_VALUES = {
  title: "",
  logo: "",
  favicon: "",
  metaDescription: "",
  metaKeywords: [""],
  banner: {
    title: {
      prefix: "",
      highlight: "",
    },
    description: "",
    bannerImage: "",
    hasOffer: false,
    offer: {
      title: "",
      description: "",
      amount: 0,
    },
  },
  about: {
    badge: "",
    title: {
      prefix: "",
      highlight: "",
    },
    description: "",
    features: [],
    image: "",
  },
  footer: {
    title: "",
    description: "",
    footerLogo: "",
  },
  contact: {
    email: "",
    phone: "",
    address: "",
  },
};

const settingValidationSchema = z.object({
  title: z.string().min(1),
  logo: z.string().min(1),
  favicon: z.string().min(1),
  metaDescription: z.string().min(1),
  metaKeywords: z.array(z.string().min(1)).nonempty(),
  banner: z.object({
    title: z.object({
      prefix: z.string().min(1),
      highlight: z.string().min(1),
    }),
    description: z.string().min(1),
    bannerImage: z.string(),
    hasOffer: z.boolean(),
    offer: z
      .object({
        title: z.string(),
        description: z.string(),
        amount: z.number(),
      })
      .optional(),
  }),
  about: z.object({
    badge: z.string().min(1),
    title: z.object({
      prefix: z.string().min(1),
      highlight: z.string().min(1),
    }),
    description: z.string().min(1),
    features: z.array(z.string()).nonempty(),
    image: z.string(),
  }),
  footer: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    footerLogo: z.string(),
  }),

  contact: z.object({
    email: z.string().email(),
    phone: z.string().min(1),
    address: z.string().min(1),
  }),
});

export type SettingType = typeof SETTING_DEFAULT_VALUES;

export { SETTING_DEFAULT_VALUES, settingValidationSchema };
