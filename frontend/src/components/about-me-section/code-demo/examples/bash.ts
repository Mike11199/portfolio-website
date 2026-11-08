export const bashExample = {
  language: "Bash",
  file: "docker-smoke-test.sh",
  command: "bash docker-smoke-test.sh",
  code: `#!/usr/bin/env bash
# CI startup smoke test for a Dockerized LLM service.
# Build the image, start the app, and grep its logs for readiness.
# Stop the container after the test; fail CI if startup fails.
# The ready message below is an example of an application log.

image="llm-app:ci"
container_id=""
ready_message="LLM model loaded successfully"

# Remove the container when the test finishes.
cleanup() {
    if [ -n "$container_id" ]; then
        docker rm --force "$container_id" > /dev/null
    fi
}

# Show the app logs and stop the CI job on failure.
fail() {
    echo "FAIL: $1"
    if [ -n "$container_id" ]; then
        docker logs "$container_id"
    fi
    cleanup
    exit 1
}

# Build and launch the application with its normal entrypoint.
start_app() {
    echo "[build] Building $image"
    if ! docker build --tag "$image" .; then
        fail "Docker build failed"
    fi

    echo "[test] Starting application"
    if ! container_id=$(docker run --detach "$image"); then
        fail "Could not start the container"
    fi
}

# Check container state and search its logs every two seconds.
check_startup() {
    local attempt=1
    local ready=false
    local state
    local logs

    while [ "$attempt" -le 60 ]; do
        if ! state=$(docker inspect --format '{{.State.Status}}' "$container_id"); then
            fail "Could not inspect the container"
        fi

        case "$state" in
            running)
                if ! logs=$(docker logs "$container_id" 2>&1); then
                    fail "Could not read the logs"
                fi
                if echo "$logs" | grep -Fq "$ready_message"; then
                    ready=true
                    break
                fi
                ;;
            created)
                echo "[test] Waiting for container startup"
                ;;
            *)
                fail "Container stopped: $state"
                ;;
        esac

        echo "[test] Waiting for model load: attempt $attempt"
        sleep 2
        attempt=$((attempt + 1))
    done

    if [ "$ready" = false ]; then
        fail "Model-ready message was not found before timeout"
    fi
    echo "PASS: Found model-ready message in docker logs"
}

start_app
check_startup
cleanup`,
  output: "[build] Building llm-app:ci\n[test] Starting application\n[test] Waiting for model load: attempt 1\n[test] Waiting for model load: attempt 2\nPASS: Found model-ready message in docker logs",
};
