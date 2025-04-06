"use client";

export const Section = ({ children, id, alt = false }) => {
  const baseClasses =
    "w-full h-full lg:min-h-screen lg:flex lg:justify-between lg:flex-col py-3 px-6 md:px-12 lg:px-28 lg:py-24";

  return (
    <section
      {...(id && { id })}
      className={`${baseClasses} ${
        alt
          ? "bg-gradient-to-b from-contrast-alt from-90% to-contrast"
          : "bg-gradient-to-b from-contrast from-90% to-contrast-alt"
      }`}
    >
      {children}
    </section>
  );
};
