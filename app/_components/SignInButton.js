import { signInAction } from "../_lib/actions";

function SignInButton({ provider, label, logo }) {
  return (
    <form action={signInAction}>
      <input type="hidden" name="provider" value={provider} />
      <button className="flex items-center gap-6 px-10 py-4 text-lg font-medium transition-all duration-200 border border-primary-300 hover:bg-primary-800 rounded-xl">
        <img src={logo} alt={`${label} logo`} height="24" width="24" />
        <span>Continue with {label}</span>
      </button>
    </form>
  );
}

export default SignInButton;
