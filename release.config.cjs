module.exports = {
  branches: [
    { name: "main" },
    { name: "next", prerelease: true },
    { name: "beta", prerelease: true }
  ],
  repositoryUrl: "https://github.com/gabrielcarlossl/azs-web-rickandmorty",
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/github'
  ]
};
