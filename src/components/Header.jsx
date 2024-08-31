import { Button } from "antd";

export default function Header() {
  return (
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h2 className="text-primary text-2xl font-semibold">Distribr</h2>
      <div className="flex items-center gap-4">
        <Button
          type="primary"
          href="/signup"
          size="large"
          className="bg-indigo-950  rounded-full hover:bg-indigo-800"
        >
          Sign Up
        </Button>
        <Button
          type="primary"
          href="/login"
          size="large"
          className="bg-indigo-950  rounded-full"
        >
          Log in
        </Button>
      </div>
    </div>
  );
}
