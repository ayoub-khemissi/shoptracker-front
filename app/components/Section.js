"use client";

const Section = ({ children, id, alt = false, centerX = false, centerY = false }) => {
  const baseClasses = "w-full min-h-screen py-3 px-6 md:px-12 lg:px-28 lg:py-24";

  return (
    <section
      {...(id && { id })}
      className={`${baseClasses} relative flex flex-col overflow-hidden ${centerX ? "items-center" : ""} ${centerY ? "justify-center" : ""}`}
    >
      <div className="absolute inset-0">
        <div
          className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${
            alt
              ? "from-purple-700/20 via-gray-900/60 to-contrast/90"
              : "from-blue-700/20 via-gray-900/60 to-contrast/90"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            alt
              ? "from-purple-500/15 via-transparent to-contrast/80"
              : "from-blue-500/20 via-transparent to-contrast/80"
          }`}
        />
        <div
          className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${
            alt
              ? "from-purple-700/10 via-transparent to-transparent"
              : "from-sky-700/15 via-transparent to-transparent"
          }`}
        />
        <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-contrast to-transparent" />
        <div className="absolute top-0 h-32 w-full bg-gradient-to-b from-contrast to-transparent" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
};

export default Section;
