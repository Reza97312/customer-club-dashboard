import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "./auth.store";

describe("useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();

    useAuthStore.setState({
      accessToken: null,
      refreshToken: null,
      hasHydrated: false,
    });
  });

  it("should set tokens correctly", () => {
    act(() => {
      useAuthStore.getState().setTokens("access-123", "refresh-456");
    });

    const state = useAuthStore.getState();

    expect(state.accessToken).toBe("access-123");
    expect(state.refreshToken).toBe("refresh-456");

    const persistedRaw = localStorage.getItem("auth-storage");
    expect(persistedRaw).not.toBeNull();

    const persisted = JSON.parse(persistedRaw as string);
    expect(persisted.state.accessToken).toBe("access-123");
    expect(persisted.state.refreshToken).toBe("refresh-456");
  });

  it("should logout and clear tokens", () => {
    act(() => {
      useAuthStore.getState().setTokens("access-123", "refresh-456");
    });

    act(() => {
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();

    expect(state.accessToken).toBeNull();
    expect(state.refreshToken).toBeNull();

    const persistedRaw = localStorage.getItem("auth-storage");
    expect(persistedRaw).not.toBeNull();

    const persisted = JSON.parse(persistedRaw as string);
    expect(persisted.state.accessToken).toBeNull();
    expect(persisted.state.refreshToken).toBeNull();
  });

  it("should mark store as hydrated after rehydrate", async () => {
    localStorage.setItem(
      "auth-storage",
      JSON.stringify({
        state: {
          accessToken: "persisted-access",
          refreshToken: "persisted-refresh",
          hasHydrated: false,
        },
        version: 0,
      }),
    );

    const storeWithPersist = useAuthStore as typeof useAuthStore & {
      persist: {
        rehydrate: () => Promise<void> | void;
      };
    };

    await act(async () => {
      await storeWithPersist.persist.rehydrate();
    });

    const state = useAuthStore.getState();

    expect(state.hasHydrated).toBe(true);
    expect(state.accessToken).toBe("persisted-access");
    expect(state.refreshToken).toBe("persisted-refresh");
  });
});
