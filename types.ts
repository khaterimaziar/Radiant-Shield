
export interface Radionuclide {
  id: string;
  name: string;
  symbol: string;
  gammaConstant: number; // Unit: µSv·m²/MBq·hr
  HVLs_cm: { // Half-Value Layers in cm
    lead: number;
    steel: number;
    concrete: number;
    water?: number; // Optional
  };
}

export interface ShieldingOption {
  id: string;
  name: string;
}

export enum ActivityUnit {
  Bq = 'Bq',
  kBq = 'kBq',
  MBq = 'MBq',
  GBq = 'GBq',
  uCi = 'µCi',
  mCi = 'mCi',
  Ci = 'Ci',
}

export enum DistanceUnit {
  cm = 'cm',
  m = 'm',
}

export enum ThicknessUnit {
  mm = 'mm',
  cm = 'cm',
  m = 'm',
}

export enum DoseRateUnit {
  uSvhr = 'µSv/hr',
  mSvhr = 'mSv/hr',
  mRhr = 'mR/hr',
}

export interface UnitOption {
  value: string;
  label: string;
}

export interface CalculationParams {
  activity: number;
  activityUnit: ActivityUnit;
  distance: number;
  distanceUnit: DistanceUnit;
  radionuclideId: string;
  shieldMaterialId: string;
  shieldThickness: number;
  shieldThicknessUnit: ThicknessUnit;
}
