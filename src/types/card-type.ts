export interface ICardResponse {
  message: string;
  card: {
    web_site: string | undefined;
    id: string;
    gender: GenderType;
    dob: string;
    address: string;
    phone: string;
    nationality: string;
    qr_url?: string;
    qr_code?: string;
    card_type?: CardType;
    is_active: boolean;
    is_deleted: boolean;
    theme_color?: string;
    updated_at: string;
    created_at: string;
    socialLinks: SocialLink[];
    job: string;
    bio: string;
    company: string;
  };
}
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
  is_deleted: boolean;
  updated_at: string;
  created_at: string;
}
export type CardType = "Minimal" | "Modern" | "Corporate";
export type GenderType = "male" | "female";

export interface CreateCardType {
  gender: string;
  nationality: string;
  dob: string;
  address: string;
  phone: string;
  card_type: string;
  social: Social[];
  web_site: string;
  job: string;
  bio: string;
}
interface Social {
  platform: string;
  icon: string;
  url: string;
}
