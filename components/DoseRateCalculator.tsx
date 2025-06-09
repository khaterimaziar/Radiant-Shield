
import React, { useState, useEffect, useCallback } from 'react';
import {
  Radionuclide,
  ShieldingOption,
  ActivityUnit,
  DistanceUnit,
  ThicknessUnit,
  DoseRateUnit,
  UnitOption,
  CalculationParams,
} from '../types';
import {
  RADIONUCLIDES,
  SHIELDING_OPTIONS,
  ACTIVITY_UNITS,
  DISTANCE_UNITS,
  THICKNESS_UNITS,
  DOSE_RATE_OUTPUT_UNITS,
  ACTIVITY_TO_MBQ,
  DISTANCE_TO_M,
  THICKNESS_TO_CM,
  DOSE_RATE_FROM_USVHR,
} from '../constants';
import InputWithUnit from './InputWithUnit';
import SelectInput from './SelectInput';

const DoseRateCalculator: React.FC = () => {
  const [activity, setActivity] = useState<number>(100);
  const [activityUnit, setActivityUnit] = useState<ActivityUnit>(ActivityUnit.MBq);
  const [distance, setDistance] = useState<number>(1);
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(DistanceUnit.m);
  const [radionuclideId, setRadionuclideId] = useState<string>(RADIONUCLIDES[0].id); // Defaults to the first radionuclide
  const [shieldMaterialId, setShieldMaterialId] = useState<string>(SHIELDING_OPTIONS[0].id);
  const [shieldThickness, setShieldThickness] = useState<number>(0);
  const [shieldThicknessUnit, setShieldThicknessUnit] = useState<ThicknessUnit>(ThicknessUnit.cm);
  
  const [calculatedDoseRate, setCalculatedDoseRate] = useState<number | null>(null);
  const [outputDoseRateUnit, setOutputDoseRateUnit] = useState<DoseRateUnit>(DoseRateUnit.uSvhr);

  const calculateDoseRate = useCallback((params: CalculationParams): number | null => {
    const radionuclide = RADIONUCLIDES.find(r => r.id === params.radionuclideId);
    if (!radionuclide) return null;

    const activityInMBq = params.activity * ACTIVITY_TO_MBQ[params.activityUnit];
    const distanceInM = params.distance * DISTANCE_TO_M[params.distanceUnit];

    if (distanceInM <= 0) return Infinity; // Or handle as an error/specific message

    // Dose rate unshielded in µSv/hr
    let doseRateUnshielded = (radionuclide.gammaConstant * activityInMBq) / (distanceInM * distanceInM);

    if (params.shieldMaterialId !== 'none' && params.shieldThickness > 0) {
      const shieldThicknessInCm = params.shieldThickness * THICKNESS_TO_CM[params.shieldThicknessUnit];
      // Type assertion for HVLs key
      const hvlKey = params.shieldMaterialId as keyof Radionuclide['HVLs_cm'];
      const HVL_cm = radionuclide.HVLs_cm[hvlKey];
      
      if (HVL_cm && HVL_cm > 0) {
        const shieldingFactor = Math.pow(0.5, shieldThicknessInCm / HVL_cm);
        doseRateUnshielded *= shieldingFactor;
      } else if (HVL_cm === undefined && params.shieldMaterialId !== 'none') {
        // If HVL is not defined for a selected material (e.g. water for some isotopes), don't apply shielding
        // This case should ideally be handled by disabling material options if HVL is not available
        console.warn(`HVL not defined for ${radionuclide.name} and material ${params.shieldMaterialId}`);
      }
    }
    return doseRateUnshielded;
  }, []);

  useEffect(() => {
    const params: CalculationParams = {
      activity,
      activityUnit,
      distance,
      distanceUnit,
      radionuclideId,
      shieldMaterialId,
      shieldThickness,
      shieldThicknessUnit,
    };
    const result = calculateDoseRate(params);
    setCalculatedDoseRate(result);
  }, [activity, activityUnit, distance, distanceUnit, radionuclideId, shieldMaterialId, shieldThickness, shieldThicknessUnit, calculateDoseRate]);
  
  const radionuclideOptions = RADIONUCLIDES.map(r => ({ value: r.id, label: `${r.name} (${r.symbol})` }));
  const shieldMaterialOptions = SHIELDING_OPTIONS.map(s => {
    const currentRadionuclide = RADIONUCLIDES.find(r => r.id === radionuclideId);
    // Disable shielding material if HVL is not defined for it (e.g. water)
    let isDisabled = false;
    if (s.id !== 'none' && currentRadionuclide) {
        const hvlKey = s.id as keyof Radionuclide['HVLs_cm'];
        if (currentRadionuclide.HVLs_cm[hvlKey] === undefined || currentRadionuclide.HVLs_cm[hvlKey] === null) {
            isDisabled = true;
        }
    }
    return { value: s.id, label: s.name, disabled: isDisabled };
  });

  // Effect to reset shield material if it becomes invalid for the selected radionuclide
  useEffect(() => {
    const currentRadionuclide = RADIONUCLIDES.find(r => r.id === radionuclideId);
    if (shieldMaterialId !== 'none' && currentRadionuclide) {
        const hvlKey = shieldMaterialId as keyof Radionuclide['HVLs_cm'];
        if (currentRadionuclide.HVLs_cm[hvlKey] === undefined || currentRadionuclide.HVLs_cm[hvlKey] === null) {
            setShieldMaterialId('none'); // Reset to 'none' if current material is invalid
        }
    }
  }, [radionuclideId, shieldMaterialId]);


  const displayDoseRate = calculatedDoseRate !== null && isFinite(calculatedDoseRate)
    ? (calculatedDoseRate * DOSE_RATE_FROM_USVHR[outputDoseRateUnit]).toPrecision(3)
    : (calculatedDoseRate === Infinity ? "Infinity (distance too small)" : "N/A");

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-slate-800 rounded-lg shadow-xl">
        {/* Inputs Column */}
        <div className="space-y-4">
          <SelectInput<string>
            id="radionuclide"
            label="Radionuclide"
            value={radionuclideId}
            onChange={(val) => {
              setRadionuclideId(val);
            }}
            options={radionuclideOptions}
          />
          <InputWithUnit
            id="activity"
            label="Activity"
            value={activity}
            onValueChange={setActivity}
            unit={activityUnit}
            onUnitChange={(u) => setActivityUnit(u as ActivityUnit)}
            unitOptions={ACTIVITY_UNITS}
          />
          <InputWithUnit
            id="distance"
            label="Distance to Source"
            value={distance}
            onValueChange={setDistance}
            unit={distanceUnit}
            onUnitChange={(u) => setDistanceUnit(u as DistanceUnit)}
            unitOptions={DISTANCE_UNITS}
            min={0.01} // Avoid zero distance
            step={0.01}
          />
        </div>

        {/* Shielding & Output Column */}
        <div className="space-y-4">
          <SelectInput<string>
            id="shieldMaterial"
            label="Shielding Material"
            value={shieldMaterialId}
            onChange={(val) => setShieldMaterialId(val)}
            options={shieldMaterialOptions}
          />
          {shieldMaterialId !== 'none' && (
            <InputWithUnit
              id="shieldThickness"
              label="Shield Thickness"
              value={shieldThickness}
              onValueChange={setShieldThickness}
              unit={shieldThicknessUnit}
              onUnitChange={(u) => setShieldThicknessUnit(u as ThicknessUnit)}
              unitOptions={THICKNESS_UNITS}
            />
          )}
           <div className="pt-4"> {/* Spacing for result */}
            <h3 className="text-lg font-semibold text-sky-400 mb-2">Calculated Dose Rate</h3>
            <div className="flex items-center p-4 bg-slate-700 rounded-md">
              <span className="text-3xl font-bold text-emerald-400 mr-2">
                {displayDoseRate}
              </span>
              <SelectInput<DoseRateUnit>
                id="outputUnit"
                label="" // No label, part of the result display
                value={outputDoseRateUnit}
                onChange={(u) => setOutputDoseRateUnit(u as DoseRateUnit)}
                options={DOSE_RATE_OUTPUT_UNITS.map(u => ({value: u.value as DoseRateUnit, label: u.label}))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoseRateCalculator;
