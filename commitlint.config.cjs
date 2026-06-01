module.exports = {
    rules: {
        "type-empty": [2, "never"],
        "subject-empty": [2, "never"],
        "type-enum": [
            2,
            "always",
            [
                "feat",
                "fix",
                "docs",
                "refactor",
                "perf",
                "test",
                "chore",
                "ci",
                "build",
                "revert"
            ]
        ]
    }
};
