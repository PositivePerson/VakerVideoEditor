import { CardInput } from "../components/Pricing/Card"

export const pricingContent: CardInput[] = [
  {
    id: 'id-creator',
    monthlyPriceId: 'price_1Imo7yIDcyzcWkKBXQCVRJd4',
    yearlyPriceId: 'price_1IsaTNIDcyzcWkKBcpkxGTce',
    plan: 'Creator',
    monthlyPrice: 19,
    yearlyPrice: 15,
    description: 'For the basics',
    action: 'Get Creator',
    chatSupport: true,
    liveSupport: false,
    features: [
      '10 Videos monthly',
      '1080p Video Resolution',
      '120 Total Minutes monthly',
      '10GB Cloud Storage',
      'No Watermarks',
    ],
  },
  {
    id: 'id-professional',
    monthlyPriceId: 'price_1InOUKIDcyzcWkKB5Ay7yFKx',
    yearlyPriceId: 'price_1IsUhLIDcyzcWkKBN5wpfXGr',
    plan: 'Professional',
    monthlyPrice: 35,
    yearlyPrice: 28,
    description: 'For small teams',
    action: 'Get Professional',
    recommended: true,
    chatSupport: true,
    liveSupport: false,
    features: [
      '30 Videos monthly',
      '4K Video Resolution',
      '400 Total Minutes monthly',
      '80GB Cloud Storage',
      'No Watermarks',
    ],
  },
  {
    id: 'id-premium',
    monthlyPriceId: 'price_1InOUUIDcyzcWkKBRYQ1KeEq',
    yearlyPriceId: 'price_1IsaU3IDcyzcWkKBGKydEmQC',
    plan: 'Premium',
    monthlyPrice: 122,
    yearlyPrice: 98,
    description: 'For the professionals',
    action: 'Get Premium',
    chatSupport: true,
    liveSupport: false,
    features: [
      '60 Videos monthly',
      '4K Video Resolution',
      '1500 Total Minutes monthly',
      '300GB Cloud Storage',
      'No Watermarks',
    ],
  },
];