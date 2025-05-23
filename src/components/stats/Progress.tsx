type Props = {
  index: number
  size: number
  label: string
}

export const Progress = ({ index, size, label }: Props) => {
  return (
    <div className="flex justify-left m-1">
      <div className="items-center justify-center w-2">{index + 1}</div>
      <div className="rounded-full w-full ml-2">
        <div
          style={{ width: `${5 + size}%` }}
          className="bg-pravda_600 text-xs font-bold text-grey-900 text-center p-0.5 rounded-l-full"
        >
          {label}
        </div>
      </div>
    </div>
  )
}
