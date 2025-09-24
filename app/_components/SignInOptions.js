import SignInButton from "./SignInButton"

const providers = [
  {
    id: "google",
    label: "Google",
    logo: "https://authjs.dev/img/providers/google.svg",
  },
  {
    id: "github",
    label: "GitHub",
    logo: "https://authjs.dev/img/providers/github.svg",
  },
]

export default function SignInOptions() {
  return (
    <div className="flex flex-row gap-4">
      {providers.map((p) => (
        <SignInButton
          key={p.id}
          provider={p.id}
          label={p.label}
          logo={p.logo}
        />
      ))}
    </div>
  )
}