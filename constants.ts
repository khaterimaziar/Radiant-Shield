
import { Radionuclide, ShieldingOption, ActivityUnit, DistanceUnit, ThicknessUnit, DoseRateUnit, UnitOption } from './types';

export const RADIONUCLIDES: Radionuclide[] = [
  {
    id: 'tc-99m',
    name: 'Technetium-99m',
    symbol: 'Tc-99m',
    gammaConstant: 0.020, // µSv·m²/MBq·hr (for 140 keV gamma)
    HVLs_cm: { lead: 0.03, steel: 0.3, concrete: 2.5, water: 6.0 },
  },
  {
    id: 'i-123',
    name: 'Iodine-123',
    symbol: 'I-123',
    gammaConstant: 0.042, // µSv·m²/MBq·hr (for 159 keV principal gamma)
    HVLs_cm: { lead: 0.04, steel: 0.4, concrete: 3.0, water: 7.0 },
  },
  {
    id: 'ga-67',
    name: 'Gallium-67',
    symbol: 'Ga-67',
    gammaConstant: 0.038, // µSv·m²/MBq·hr (weighted average for its gammas)
    HVLs_cm: { lead: 0.1, steel: 0.8, concrete: 3.5, water: 10.0 },
  },
  {
    id: 'f-18',
    name: 'Fluorine-18 (PET)',
    symbol: 'F-18',
    gammaConstant: 0.155, // µSv·m²/MBq·hr (for two 511 keV annihilation photons)
    HVLs_cm: { lead: 0.4, steel: 1.2, concrete: 4.0, water: 11.0 },
  },
  {
    id: 'tl-201',
    name: 'Thallium-201',
    symbol: 'Tl-201',
    gammaConstant: 0.012, // µSv·m²/MBq·hr (for X-rays and gammas)
    HVLs_cm: { lead: 0.01, steel: 0.2, concrete: 2.0, water: 5.0 },
  },
  {
    id: 'i-131',
    name: 'Iodine-131',
    symbol: 'I-131',
    gammaConstant: 0.059, // µSv·m²/MBq·hr (for 364 keV gamma)
    HVLs_cm: { lead: 0.25, steel: 0.8, concrete: 3.0, water: 10.0 },
  },
  {
    id: 'lu-177',
    name: 'Lutetium-177',
    symbol: 'Lu-177',
    gammaConstant: 0.016, // µSv·m²/MBq·hr (for principal gammas 113 keV, 208 keV)
    HVLs_cm: { lead: 0.05, steel: 0.5, concrete: 3.0, water: 8.0 },
  },
  {
    id: 'y-90',
    name: 'Yttrium-90 (Bremsstrahlung)',
    symbol: 'Y-90',
    gammaConstant: 0.005, // Effective µSv·m²/MBq·hr for Bremsstrahlung
    HVLs_cm: { lead: 0.3, steel: 1.0, concrete: 4.5, water: 15.0 }, // HVLs for Bremsstrahlung
  },
  {
    id: 'ra-223',
    name: 'Radium-223',
    symbol: 'Ra-223',
    gammaConstant: 0.033, // µSv·m²/MBq·hr (complex gamma spectrum)
    HVLs_cm: { lead: 0.1, steel: 0.7, concrete: 3.0, water: 9.0 },
  },
  {
    id: 'sm-153',
    name: 'Samarium-153',
    symbol: 'Sm-153',
    gammaConstant: 0.011, // µSv·m²/MBq·hr (for 103 keV gamma)
    HVLs_cm: { lead: 0.02, steel: 0.2, concrete: 2.0, water: 5.0 },
  },
  {
    id: 'ga-68',
    name: 'Gallium-68 (PET)',
    symbol: 'Ga-68',
    gammaConstant: 0.155, // µSv·m²/MBq·hr (for two 511 keV annihilation photons, similar to F-18)
    HVLs_cm: { lead: 0.4, steel: 1.2, concrete: 4.0, water: 11.0 },
  },
  {
    id: 'in-111',
    name: 'Indium-111',
    symbol: 'In-111',
    gammaConstant: 0.086, // µSv·m²/MBq·hr (for 171 keV & 245 keV gammas)
    HVLs_cm: { lead: 0.08, steel: 0.5, concrete: 3.2, water: 8.5 },
  },
];

export const SHIELDING_OPTIONS: ShieldingOption[] = [
  { id: 'none', name: 'None' },
  { id: 'lead', name: 'Lead' },
  { id: 'steel', name: 'Steel' },
  { id: 'concrete', name: 'Concrete' },
  { id: 'water', name: 'Water' },
];

export const ACTIVITY_UNITS: UnitOption[] = [
  { value: ActivityUnit.MBq, label: 'MBq' },
  { value: ActivityUnit.GBq, label: 'GBq' },
  { value: ActivityUnit.kBq, label: 'kBq' },
  { value: ActivityUnit.Bq, label: 'Bq' },
  { value: ActivityUnit.Ci, label: 'Ci' },
  { value: ActivityUnit.mCi, label: 'mCi' },
  { value: ActivityUnit.uCi, label: 'µCi' },
];

export const DISTANCE_UNITS: UnitOption[] = [
  { value: DistanceUnit.m, label: 'm' },
  { value: DistanceUnit.cm, label: 'cm' },
];

export const THICKNESS_UNITS: UnitOption[] = [
  { value: ThicknessUnit.cm, label: 'cm' },
  { value: ThicknessUnit.mm, label: 'mm' },
  { value: ThicknessUnit.m, label: 'm' },
];

export const DOSE_RATE_OUTPUT_UNITS: UnitOption[] = [
  { value: DoseRateUnit.uSvhr, label: 'µSv/hr' },
  { value: DoseRateUnit.mSvhr, label: 'mSv/hr' },
  { value: DoseRateUnit.mRhr, label: 'mR/hr' },
];

// Conversion factors to base units
// Activity to MBq
export const ACTIVITY_TO_MBQ: { [key in ActivityUnit]: number } = {
  [ActivityUnit.Bq]: 1 / 1e6,
  [ActivityUnit.kBq]: 1 / 1e3,
  [ActivityUnit.MBq]: 1,
  [ActivityUnit.GBq]: 1e3,
  [ActivityUnit.uCi]: 0.037,
  [ActivityUnit.mCi]: 37,
  [ActivityUnit.Ci]: 37000,
};

// Distance to meters
export const DISTANCE_TO_M: { [key in DistanceUnit]: number } = {
  [DistanceUnit.cm]: 0.01,
  [DistanceUnit.m]: 1,
};

// Thickness to cm (HVLs are in cm)
export const THICKNESS_TO_CM: { [key in ThicknessUnit]: number } = {
  [ThicknessUnit.mm]: 0.1,
  [ThicknessUnit.cm]: 1,
  [ThicknessUnit.m]: 100,
};

// Dose rate conversion from µSv/hr
export const DOSE_RATE_FROM_USVHR: { [key in DoseRateUnit]: number } = {
  [DoseRateUnit.uSvhr]: 1,
  [DoseRateUnit.mSvhr]: 0.001,
  [DoseRateUnit.mRhr]: 0.1, // Approximation: 1 mR/hr ≈ 10 µSv/hr
};
