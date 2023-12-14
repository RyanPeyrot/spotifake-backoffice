import Particles from 'https://cdn.skypack.dev/react-particles@2.8.0';
import {loadFull} from 'https://cdn.skypack.dev/tsparticles@2.8.0';
import {useCallback} from 'react';

export const Confettis = () => {
  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);
  const rollDarkenValue = 10;
  const emittersConfig = {
    direction: 'none',
    position: {
      x: 50,
      y: 105,
    },
    life: {
      count: 1,
      duration: 0.3,
      delay: 0,
    },
    rate: {
      delay: 0.1,
      quantity: 1,
    },
    particles: {
      move: {
        direction: 'top',
      },
    },
  };

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-screen h-screen z-50">
      <Particles
        init={particlesInit}
        options={{
          pauseOnBlur: false,
          pauseOnOutsideViewport: false,
          delay: 0,
          fpsLimit: 120,
          particles: {
            number: {
              value: 0,
            },
            color: {
              value: ['#BD10E0', '#B8E986', '#50E3C2', '#FFD300', '#E86363'],
            },
            shape: {
              type: ['triangle', 'triangle', 'triangle'],
              options: {
                polygon: {
                  sides: 3,
                },
              },
            },
            move: {
              enable: true,
              gravity: {
                acceleration: 28,
                enable: true,
              },
              drift: {min: -12, max: 12},
              speed: {min: 165, max: 400},
              decay: 0.08,
              outModes: {
                default: 'none',
              },
            },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: 'random',
              move: true,
              animation: {
                enable: true,
                speed: 60,
              },
            },
            tilt: {
              direction: 'random',
              enable: true,
              move: true,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 60,
              },
            },
            roll: {
              darken: {
                enable: true,
                value: rollDarkenValue,
              },
              enable: true,
              speed: {
                min: 15,
                max: 25,
              },
            },
            wobble: {
              distance: 40,
              enable: true,
              move: true,
              speed: {
                min: -15,
                max: 15,
              },
            },
            opacity: {
              value: {min: 0, max: 1},
              animation: {
                enable: false,
              },
            },
            life: {
              duration: {
                sync: true,
                value: 8,
              },
              count: 1,
            },
            size: {
              value: {min: 11, max: 19},
            },
          },
          detectRetina: true,
          emitters: emittersConfig,
          responsive: [
            {
              maxWidth: 640,
              options: {
                particles: {
                  size: {
                    value: {min: 7, max: 14},
                  },
                  move: {
                    drift: {min: -1, max: 1},
                    speed: {min: 55, max: 95},
                  },
                },
                emitters: {
                  ...emittersConfig,
                  rate: {delay: 0.1, quantity: 50},
                },
              },
            },
            {
              maxWidth: 900,
              options: {
                particles: {
                  size: {
                    value: {min: 8, max: 15},
                  },
                  move: {
                    drift: {min: -4, max: 4},
                    speed: {min: 95, max: 165},
                  },
                },
                emitters: {
                  ...emittersConfig,
                  rate: {delay: 0.1, quantity: 60},
                },
              },
            },
            {
              maxWidth: 1600,
              options: {
                particles: {
                  size: {
                    value: {min: 9, max: 16},
                  },
                  move: {
                    drift: {min: -5, max: 5},
                    speed: {min: 115, max: 195},
                  },
                },
                emitters: {
                  ...emittersConfig,
                  rate: {delay: 0.1, quantity: 65},
                },
              },
            },
          ],
        }}
      />
    </div>
  );
};
