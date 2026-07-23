module.exports = {
    apps: [
        {
            name: "wedding-frontend",
            interpreter: "node",
            script: "node_modules/next/dist/bin/next",
            args: ["start", "-p", "5010"],
            cwd: "/var/www/www-root/data/www/wedding.baranov-digital.ru/frontend",
            instances: 1,
            exec_mode: "fork",
            watch: false,
            max_memory_restart: "500M",
            env: {
                NODE_ENV: "production",
                NODE_OPTIONS: "--no-deprecation",
            },
            error_file:
                "/var/www/www-root/data/www/wedding.baranov-digital.ru/logs/frontend-error.log",
            out_file:
                "/var/www/www-root/data/www/wedding.baranov-digital.ru/logs/frontend-out.log",
            log_date_format: "YYYY-MM-DD HH:mm:ss Z",
            merge_logs: true,
            kill_timeout: 5000,
        },
    ],
};
