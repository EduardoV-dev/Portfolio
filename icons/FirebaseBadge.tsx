import * as React from "react"

function FirebaseBadge(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={32}
      height={32}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.8 24.6l.17-.237 8.02-15.214.017-.161-3.535-6.64a.656.656 0 00-1.227.207L5.8 24.6z"
        fill="#FFC24A"
      />
      <path
        d="M5.9 24.42l.128-.25 7.937-15.056-3.526-6.666a.6.6 0 00-1.133.206L5.9 24.42z"
        fill="#FFA712"
      />
      <path
        d="M16.584 14.01l2.632-2.7-2.633-5.021a.678.678 0 00-1.195 0l-1.407 2.682V9.2l2.603 4.81z"
        fill="#F4BD62"
      />
      <path
        d="M16.537 13.9l2.559-2.62-2.559-4.88a.589.589 0 00-1.074-.047l-1.414 2.729-.042.139 2.53 4.679z"
        fill="#FFA50E"
      />
      <path
        d="M5.802 24.601l.077-.078.279-.113 10.26-10.222.13-.354-2.559-4.878-8.187 15.645z"
        fill="#F6820C"
      />
      <path
        d="M16.912 29.756l9.288-5.18-2.654-16.33a.635.635 0 00-1.075-.346L5.8 24.6l9.233 5.155a1.927 1.927 0 001.878 0"
        fill="#FDE068"
      />
      <path
        d="M26.115 24.534L23.483 8.326a.556.556 0 00-.967-.353L5.9 24.569l9.131 5.1a1.912 1.912 0 001.863 0l9.221-5.135z"
        fill="#FCCA3F"
      />
      <path
        d="M16.912 29.6a1.927 1.927 0 01-1.878 0l-9.158-5.078-.076.078 9.233 5.155a1.927 1.927 0 001.878 0l9.289-5.178-.023-.14-9.265 5.163z"
        fill="#EEAB37"
      />
    </svg>
  )
}

export default FirebaseBadge
