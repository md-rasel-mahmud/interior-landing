import { PAYMENT_PROVIDER, PAYMENT_TYPE } from "@/enums/PaymentMethods.enum";
import { Schema, model, models } from "mongoose";

const gatewayCredentialsSchema = new Schema(
  {
    storeId: String,
    storePassword: String,
    signatureKey: String,
    merchantId: String,
    password: String,
    appKey: String,
    appSecret: String,
    clientId: String,
    clientSecret: String,
    secretKey: String,
    publishableKey: String,
    callbackURL: String,
  },
  { _id: false }
);

const paymentMethodSchema = new Schema(
  {
    type: {
      type: String,
      enum: Object.values(PAYMENT_TYPE),
      required: true,
    },

    provider: {
      type: String,
      enum: Object.values(PAYMENT_PROVIDER),
      required: true,
    },

    personalNumber: {
      type: String,
      validate: {
        validator: function (this: {
          type: PAYMENT_TYPE;
          personalNumber?: string;
        }) {
          // Only require personalNumber if type is PERSONAL
          if (this.type === PAYMENT_TYPE.PERSONAL) {
            return (
              typeof this.personalNumber === "string" &&
              this.personalNumber.length > 0
            );
          }
          return true;
        },
        message: "personalNumber is required when type is PERSONAL",
      },
    },

    note: {
      type: String,
      trim: true,
    },

    logo: {
      type: String,
      default: "/placeholder.svg",
      required: true,
    },

    gatewayCredentials: gatewayCredentialsSchema,

    isActive: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

paymentMethodSchema.index({ provider: 1 }, { unique: true });

export const PaymentMethod =
  models.PaymentMethod || model("PaymentMethod", paymentMethodSchema);
