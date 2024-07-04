import Image from "next/image";

export default function Logo(props: { w: number; h: number }) {
  return (
    <Image
      src={"/logo/logo.png"}
      alt="logo"
      width={props.w}
      height={props.h}
      priority
    />
  );
}
