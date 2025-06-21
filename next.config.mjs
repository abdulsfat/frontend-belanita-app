const nextConfig = {
  // matcher: ["/profile", "/dashboard", "/login", "/register"],
  reactStrictMode: true,
  images: {
    domains: ["belanita.karyakreasi.id"],
    // domains: ["127.0.0.1", "localhost"],
    // domains: ["192.168.18.204"],

  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true
          }
        }
      ]
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js"
        }
      }
    }
  }
};

export default nextConfig;