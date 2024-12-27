import { useCallback } from "react";
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

const AnimatedBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Particles
        init={particlesInit}
        options={{
          particles: {
            number: {
              value: 50,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: "#EAD8B1"
            },
            opacity: {
              value: 0.2,
              random: true
            },
            size: {
              value: 3,
              random: true
            },
            move: {
              enable: true,
              speed: 1,
              direction: "none",
              random: true,
              straight: false,
              outModes: {
                default: "out"
              }
            }
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "grab"
              }
            },
            modes: {
              grab: {
                distance: 140,
                links: {
                  opacity: 0.2
                }
              }
            }
          },
          background: {
            color: "#001F3F"
          }
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
