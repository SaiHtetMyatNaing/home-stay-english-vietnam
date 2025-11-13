const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">English Homestay Vietnam</h3>
          <p className="text-background/70 mb-4">
            Building bridges between cultures, one homestay at a time.
          </p>
          <div className="border-t border-background/20 pt-6 mt-6">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} English Homestay Vietnam. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
