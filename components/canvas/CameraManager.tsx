import { CameraControls } from "@react-three/drei";
import { button, useControls } from "leva";
import { useEffect, useRef } from "react";
import { UI_MODES, useConfiguratorStore } from "@/store/store";
import { useThree } from "@react-three/fiber";

export const START_CAMERA_POSITION = [500, 10, 1000];
export const DEFAULT_CAMERA_POSITION = [
    0., 0.25, 2.];
export const DEFAULT_CAMERA_TARGET = [0, 0, 0];

export const CameraManager = ({ loading }: { loading: boolean }) => {

    const setScreenshot = useConfiguratorStore((state) => state.setScreenshot);
    const gl = useThree((state) => state.gl);
    useEffect(() => {
        const screenshot = () => {
            console.log("Screenshot");
            const overlayCanvas = document.createElement("canvas");

            overlayCanvas.width = gl.domElement.width;
            overlayCanvas.height = gl.domElement.height;
            const overlayCtx = overlayCanvas.getContext("2d");
            if (!overlayCtx) {
                return;
            }
            // Draw the original rendered image onto the overlay canvas
            overlayCtx.drawImage(gl.domElement, 0, 0);

            // Create an image element for the logo
            const logo = new Image();
            logo.src = "/images/playground.png";
            logo.crossOrigin = "anonymous";
            logo.onload = () => {
                // Draw the logo onto the overlay canvas
                const logoWidth = 765 / 4; // Adjust the width of the logo
                const logoHeight = 370 / 8; // Adjust the height of the logo
                const x = overlayCanvas.width - logoWidth - 42; // Adjust the position of the logo
                const y = overlayCanvas.height - logoHeight - 42; // Adjust the position of the logo
                overlayCtx.drawImage(logo, x, y, logoWidth, logoHeight);

                // Create a link element to download the image
                const link = document.createElement("a");
                const date = new Date();
                link.setAttribute(
                    "download",
                    `Avatar_${date.toISOString().split("T")[0]
                    }_${date.toLocaleTimeString()}.png`
                );
                link.setAttribute(
                    "href",
                    overlayCanvas
                        .toDataURL("image/png")
                        .replace("image/png", "image/octet-stream")
                );
                link.click();
            };
        };
        setScreenshot(screenshot);
    }, [gl]);

    const controls = useRef();
    const currentCategory = useConfiguratorStore(
        (state) => state.currentCategory
    );
    const initialLoading = useConfiguratorStore((state) => state.loading);
    const mode = useConfiguratorStore((state) => state.mode);
    useControls({
        getCameraPosition: button(() => {
            console.log("Camera Position", [...controls.current.getPosition()]);
        }),
        getCameraTarget: button(() => {
            console.log("Camera Target", [...controls.current.getTarget()]);
        }),
    });

    useEffect(() => {
        if (initialLoading) {
            controls.current.setLookAt(
                ...START_CAMERA_POSITION,
                ...DEFAULT_CAMERA_TARGET
            );
        } else if (
            !loading &&
            mode === UI_MODES.CUSTOMIZE &&
            currentCategory?.camera_placements
        ) {
            controls.current.setLookAt(
                ...currentCategory.camera_placements.position,
                ...currentCategory.camera_placements.target,
                true
            );
        } else {
            controls.current.setLookAt(
                ...DEFAULT_CAMERA_POSITION,
                ...DEFAULT_CAMERA_TARGET,
                true
            );
        }
    }, [currentCategory, mode, initialLoading, loading]);

    return (
        <CameraControls
            ref={controls}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={8}
        />
    );
};