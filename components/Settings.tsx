"use client"
import { selectConfig } from "@/redux/selectors"
import { useSelector, useDispatch } from "react-redux"
import { updateConfig } from "@/redux/features/config/configSlice"
import { useEffect, useState } from "react"

export const Settings = () => {
  const config = useSelector(selectConfig)
  const dispatch = useDispatch()

  return (
    <div className="pr-40 py-10 pl-10">
      <h1>Settings</h1>

      <form className="space-y-10" onSubmit={e => e.preventDefault()}>
        <ToggleBox
          label="Slide Animation"
          value={config.slideAnimation}
          onChange={() => {
            dispatch(updateConfig({ slideAnimation: !config.slideAnimation }))
          }}
        />
        <Slider
          label="Slide Animation Duration"
          value={config.animationDuration}
          onChange={value => {
            dispatch(updateConfig({ animationDuration: value }))
          }}
          min={100}
          max={1100}
          step={50}
          unit="ms"
        />
        <ToggleBox
          label="Add Characters in Progression"
          value={config.addCharactersInProgression}
          onChange={() => {
            dispatch(updateConfig({ addCharactersInProgression: !config.addCharactersInProgression }))
          }}
        />
        <Slider
          label="Level to Achieve to Add New Characters"
          value={config.levelToAchieveToAddNewCharacters}
          onChange={value => {
            dispatch(updateConfig({ levelToAchieveToAddNewCharacters: value }))
          }}
          min={10}
          max={100}
          step={10}
        />
        <Slider
          label="Cooldown"
          value={config.cooldown}
          onChange={value => {
            dispatch(updateConfig({ cooldown: value }))
          }}
          min={0}
          max={30}
          step={1}
        />
        <ToggleBox
          label="Submit on Right Answer"
          value={config.submitOnRightAnswer}
          onChange={() => {
            dispatch(updateConfig({ submitOnRightAnswer: !config.submitOnRightAnswer }))
          }}
        />
      </form>
    </div>
  )
}

const ToggleBox = ({ label, value, onChange }: { label: string; value: boolean; onChange: () => void }) => {
  return (
    <div>
      <label title={label} className="cursor-pointer select-none text-xl" htmlFor={label}>
        {label}
      </label>
      <br />
      <label title={label} className="cursor-pointer" htmlFor={label} tabIndex={0} onKeyDown={e => e.key === "Enter" && onChange()}>
        <input type="checkbox" id={label} checked={value} onChange={onChange} className="hidden" />
        <div className={`relative flex justify-center items-center border-[3px] rounded-3xl w-32 mt-2 ${value ? "border-primary" : "border-neutral"}`}>
          <div className={`capitalize select-none text-sm text-nowrap font-semibold z-10 px-4 py-3 transition-colors duration-150 ${value ? "text-white" : "text-neutral hover:text-dark cursor-pointer"}`}>ON</div>
          <div className={`capitalize select-none text-sm text-nowrap z-10 font-semibold px-4 py-3 transition-colors duration-150 ${!value ? "text-white" : "text-primary hover:text-dark cursor-pointer"}`}>OFF</div>
          <div className={`absolute h-full w-1/2 transition-all duration-150 ease-in-out ${value ? "rounded-l-2xl rounded-r-3xl left-0 bg-primary" : "rounded-l-3xl rounded-r-2xl left-1/2 bg-neutral"}`}></div>
        </div>
      </label>
    </div>
  )
}

const Slider = ({ label, value, onChange, min, max, step, unit }: { label: string; value: number; onChange: (value: number) => void; min: number; max: number; step: number; unit?: string }) => {
  const [inputNumberValue, setInputNumberValue] = useState(value)
  const steps = (max - min) / step
  const label2 = Math.round(steps / 3) * step + min
  const label3 = Math.round((steps / 3) * 2) * step + min

  useEffect(() => {
    setInputNumberValue(value)
  }, [value])

  const roundToNearestStep = (number: number) => Math.round(number / step) * step

  const numberInputOnKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const newValue = Math.max(min, Math.min(max, inputNumberValue))
      setInputNumberValue(roundToNearestStep(newValue))
      onChange(roundToNearestStep(newValue))
    }
    if (e.key === "ArrowUp") {
      const newValue = Math.max(min, Math.min(max, inputNumberValue + step))
      setInputNumberValue(roundToNearestStep(newValue) - 1)
    }
    if (e.key === "ArrowDown") {
      const newValue = Math.max(min, Math.min(max, inputNumberValue - step))
      setInputNumberValue(roundToNearestStep(newValue) + 1)
    }
  }

  const numberInputOnBlurHandler = () => {
    const newValue = Math.max(min, Math.min(max, inputNumberValue))
    setInputNumberValue(roundToNearestStep(newValue))
    onChange(roundToNearestStep(newValue))
  }

  return (
    <div>
      <label title={label} className="cursor-pointer select-none text-xl" htmlFor={label}>
        {label}
      </label>
      <br />

      <div className="flex items-center gap-2">
        <div className="inline-block w-96 relative mb-6 mt-5 select-none">
          <input className="w-full h-2 bg-neutral rounded-lg appearance-none cursor-pointer accent-primary" name="slider" type="range" value={value} onChange={e => onChange(parseInt(e.target.value))} min={min} max={max} step={step} />
          <span className="text-sm text-passive absolute start-0 -bottom-6 select-none">
            {min}
            {unit || ""}
          </span>
          <span className="text-sm text-passive absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 select-none">
            {label2}
            {unit || ""}
          </span>
          <span className="text-sm text-passive absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6 select-none">
            {label3}
            {unit || ""}
          </span>
          <span className="text-sm text-passive absolute end-0 -bottom-6 select-none">
            {max}
            {unit || ""}
          </span>
        </div>
        <input type="number" id={label} value={inputNumberValue} onChange={e => setInputNumberValue(parseInt(e.target.value))} onKeyDown={numberInputOnKeyDownHandler} onBlur={numberInputOnBlurHandler} className="w-32 h-10 text-center border-2 border-neutral rounded-lg" />
      </div>
    </div>
  )
}
