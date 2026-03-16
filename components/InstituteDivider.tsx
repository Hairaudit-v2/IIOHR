import React from "react";

export function InstituteDivider() {
  return (
    <div
      className="institute-divider"
      style={{
        marginTop: 80,
        marginBottom: 40,
        textAlign: "center",
      }}
    >
      <div
        className="institute-divider__label"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#8B6B4A",
        }}
      >
        <img
          src="/logo/iiohr-mark.svg"
          alt="IIOHR crest"
          width={22}
          height={22}
          loading="lazy"
        />
        <span>International Institute of Hair Restoration</span>
      </div>
      <div
        className="institute-divider__rule"
        aria-hidden="true"
        style={{
          margin: "12px auto 0",
          width: 120,
          height: 2,
          backgroundColor: "#C8A47E",
        }}
      />
    </div>
  );
}

export default InstituteDivider;

