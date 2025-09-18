export interface User {
  uid: string;
  email: string;
}

export interface Profile {
  name: string;
  subtitle: string;
  location: string;
  bio: string;
  imageUrl: string;
  verifiedBadgeUrl?: string;
  nameColor?: string;
  subtitleColor?: string;
  locationColor?: string;
  bioColor?: string;
  socialMedia?: SocialMediaLink[];
  socialMediaSpacing?: number;
}

export interface SocialMediaLink {
  id: string;
  platform: string;
  url: string;
  iconUrl: string;
  active: boolean;
  openInNewTab: boolean;
}

export interface Theme {
  preset: 'Default Light' | 'Midnight Dark' | 'Minimalist' | 'Custom';
  backgroundColor: string;
  backgroundType: 'solid' | 'gradient';
  gradientDirection: string;
  gradientColors: string[];
  primaryColor: string;
  font: string;
}

export interface Media {
  wallpaperUrl: string;
  wallpaperOpacity?: number;
  videoUrl: string;
  videoOpacity?: number;
  faviconUrl: string;
}

export interface Pixels {
  metaPixel: string;
  googleTag: string;
  tiktokPixel: string;
  snapchatPixel: string;
  pinterestTag: string;
  customHeaderScripts: string;
}

export interface Analytics {
  pageViews: number;
  uniqueVisitors: number;
  totalClicks: number;
  linkClicks: { [linkId: string]: number };
}

export type LinkType = 
  | 'standardLink'
  | 'textBlock'
  | 'imageBlock'
 | 'imageOnly'
 | 'videoOnly'
  | 'buttonBlock'
  | 'productBlock'
  | 'productBlock'
  | 'musicBlock'
  | 'youtubeEmbed'
  | 'youtubeExclusive'
 | 'youtubeLive'
 | 'lineBlock';

export interface Link {
  id: string;
  type: LinkType;
  order: number;
  active: boolean;
  title: string;
  url: string;
  thumbnailUrl?: string;
  thumbnailType?: 'image' | 'video';
  password?: string;
  openInNewWindow?: boolean;
  schedule?: {
    start: string;
    end: string;
  };
  artist?: string;
  platform?: string;
  description?: string;
  images?: string[];
  price?: string;
  currency?: string;
  layout?: 'fullWidth' | 'twoColumns';
  products?: Product[];
  stripePaymentLink?: string;
  styling?: {
    backgroundColor?: string;
    borderColor?: string;
    opacity?: number;
    dropShadow?: number;
    borderRadius?: number;
  };
  buttonAlignment?: 'left' | 'center' | 'right';
  buttonStyling?: {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
    opacity?: number;
  };
  embedCode?: string;
  embedBehavior?: 'url' | 'embed';
  collapsible?: boolean;
  spacingSize?: 'small' | 'medium' | 'large' | 'xlarge' | 'custom';
  customSpacing?: number;
  textContent?: {
    type: 'heading' | 'paragraph';
    content: string;
    styles: {
      fontSize?: string;
      fontFamily?: string;
      fontWeight?: 'normal' | 'bold';
      fontStyle?: 'normal' | 'italic';
      textAlign?: 'left' | 'center' | 'right';
      color?: string;
      textDecoration?: 'none' | 'underline';
    };
  }[];
  topSpacing?: number;
  bottomSpacing?: number;
  marginTop?: number;
  marginBottom?: number;
  imageSize?: number; // 1-100 percentage
  imageAlignment?: 'left' | 'center' | 'right';
  aspectRatio?: string;
 lineSettings?: {
   width?: number; // 1-100 percentage
   alignment?: 'left' | 'center' | 'right';
   color?: string;
   style?: 'solid' | 'dashed' | 'dotted' | 'wavy';
   thickness?: number; // 1-10 pixels
   dashSpacing?: number; // 1-20 pixels for dashed/dotted lines
 };
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  images?: string[];
  description: string;
  category: string;
  stripeProductId?: string;
  stripePriceId?: string;
  stripePaymentLink?: string;
  // Enhanced product information
  originalPrice?: number; // For showing discounts
  isOnSale?: boolean;
  saleLabel?: string; // e.g., "SOLDE", "SALE", "LIMITED TIME"
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}
export interface PageData {
  profile: Profile;
  theme: Theme;
  media: Media;
  pixels: Pixels;
  links: Link[];
  analytics: Analytics;
  products?: Product[];
  categories?: Category[];
}

export interface DraftState {
  pageData: PageData;
  hasUnsavedChanges: boolean;
}