
export enum CarCategory {
  SEDAN = 'Sedan',
  SUV = 'SUV',
  HATCHBACK = 'Hatchback',
  MPV = 'MPV'
}

export interface Dimensions {
  length: number;
  width: number;
  height: number;
  wheelbase: number;
  groundClearance?: number;
  turningRadius?: number;
}

export interface TrunkCapacity {
  frunk?: number;
  rear: number;
}

export interface MotorStats {
  type: string;
  maxPower: string; // kW or HP
  maxTorque: string; // Nm
  layout?: string; // FWD/RWD/AWD
}

export interface BatteryStats {
  type: string;
  capacity: number; // kWh
  technology?: string;
  charging: {
    ac: string;
    dc: string;
    features?: string[];
  };
}

export interface Chassis {
  frontSuspension: string;
  rearSuspension: string;
  frontBrakes: string;
  rearBrakes: string;
  wheels: string[];
  tyres: string;
}

export interface Variant {
  id: string;
  name: string;
  price: number; // Changed to number for formatting
  originalPrice?: number; // Added for discount display (coret harga)
  powertrain: string; // RWD / AWD
  motor: MotorStats;
  performance: {
    acceleration: string; // 0-100
    topSpeed?: string;
  };
  battery: {
    capacity: number;
    range: string; // NEDC or WLTP
  };
  weight?: number;
  imageUrl: string;
  features?: string[]; // Variant specific features
  soldOut?: boolean; // New property to mark availability
}

export interface ColorOption {
  name: string;
  hex: string;
  imageUrl?: string; // Added to support dynamic car image by color
}

export interface CarModel {
  id: string;
  name: string;
  tagline: string;
  category: CarCategory;
  description: string;
  startingPrice: number;
  originalPrice?: number; // Added for discount display (coret harga)

  // Visuals
  heroImage: string;
  gallery: string[];
  colors: ColorOption[];
  youtubeVideoId?: string; // ADDED: For Video Section

  // Key Specs (For Cards)
  seats: number;
  summaryRange: string;
  summaryPowertrain: string;

  // Detailed Specs
  dimensions: Dimensions;
  trunk: TrunkCapacity;
  battery: BatteryStats;
  chassis: Chassis;

  // Features
  features: {
    safety: string[];
    interior: string[];
    exterior: string[];
    infotainment: string[];
  };

  variants: Variant[];
}

export interface LeadFormData {
  name: string;
  phone: string;
  model: string;
  variant: string;
  message?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  model: string;
  date: string;
  status: 'New' | 'Contacted' | 'Prospect' | 'SPK' | 'Lost';
  source: string;
  salesName: string;
}

export interface DealerInfo {
  salesName: string;
  salesPhone: string;
  displayPhone: string;
  dealerName: string;
  address: string;
  domain: string;
  email: string;
  mapsUrl: string;
}

export interface SiteStats {
  visitors: number;
  downloads: number;
}
