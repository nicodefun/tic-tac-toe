/* eslint-disable react/prop-types */
import { IconX, IconO, Restart } from "../src/Icons";
import styles from "./Symbol.module.css";

export default function Symbol({ size, type = "logo", color, style = "lg" }) {

  if (type === "x") {
    return <IconX size={size} color={color} />;
  }
  if (type === "o") {
    return <IconO size={size} color={color} />;
  }
  if(type === 'restart'){
    return <Restart size={size} />
  }

  const logoStyles = `${styles.symbol} ${styles[style]} `
  return (
    <div className={logoStyles}>
      <IconX size={size} />
      <IconO size={size} />
    </div>
  );
}
