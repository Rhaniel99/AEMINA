import React from "react"

export default function ProgressWind( { progress }) {
  return (
    <>
      {/*<!-- Component: Progress bar 25% with trailing label --> */}
      <div className="flex w-full gap-2">
        <label
          id="p01e-label"
          for="p01e"
          className="order-2 mb-0 text-center text-xs text-slate-500 "
        >
          <span className="sr-only">uploading</span> {progress}%
        </label>
        <progress
          aria-labelledby="p01e-label"
          id="p01e"
          max="100"
          value={progress}
          className="block w-full overflow-hidden rounded bg-slate-100 [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
        >
          {progress}%
        </progress>
      </div>
      {/*<!-- End Progress bar 25% with trailing label --> */}
    </>
  )
}
