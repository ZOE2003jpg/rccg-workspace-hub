const Footer = () => {
  return (
    <footer className="py-8 px-4 bg-foreground text-background/70">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg font-semibold text-background">
          RCCG Master's Place
        </p>
        <p className="text-sm">
          © {new Date().getFullYear()} RCCG Master's Place. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
