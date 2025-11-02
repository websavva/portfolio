export default defineComponent({
  name: 'LetterGlitch',

  props: {
    class: {
      type: String,
      default: '',
    },

    glitchColors: {
      type: Array as PropType<string[]>,
      default: () => ['#3db9c9', '#3d64a1', '#a9b1d6'],
    },
  },

  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const letters = ref<
      {
        char: string;
        color: string;
        targetColor: string;
        colorProgress: number;
      }[]
    >([]);
    const grid = ref({ columns: 0, rows: 0 });
    const context = ref<CanvasRenderingContext2D | null>(
      null,
    );
    const rootElement = ref<HTMLElement | null>(null);

    const lettersAndSymbols = [
      'A',
      'B',
      'C',
      'D',
      'E',
      'F',
      'G',
      'H',
      'I',
      'J',
      'K',
      'L',
      'M',
      'N',
      'O',
      'P',
      'Q',
      'R',
      'S',
      'T',
      'U',
      'V',
      'W',
      'X',
      'Y',
      'Z',
      '!',
      '@',
      '#',
      '$',
      '&',
      '*',
      '(',
      ')',
      '-',
      '_',
      '+',
      '=',
      '/',
      '[',
      ']',
      '{',
      '}',
      ';',
      ':',
      '<',
      '>',
      ',',
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
    ];

    const getRandomChar = () => {
      return lettersAndSymbols[
        Math.floor(Math.random() * lettersAndSymbols.length)
      ];
    };

    const getRandomColor = () => {
      return props.glitchColors[
        Math.floor(
          Math.random() * props.glitchColors.length,
        )
      ];
    };

    const getCharConfig = () => {
      const fontSize = calculateFontSize();

      return {
        fontSize,
        charWidth: fontSize * 0.625,
        charHeight: fontSize * 1.25,
      };
    };

    const calculateFontSize = () => {
      return parseInt(
        getComputedStyle(
          rootElement.value!,
        ).getPropertyValue('--root-font-size'),
        10,
      );
    };

    const calculateGrid = (
      width: number,
      height: number,
      {
        charWidth,
        charHeight,
      }: ReturnType<typeof getCharConfig>,
    ) => {
      const columns = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / charHeight);
      return { columns, rows };
    };

    const initializeLetters = (
      columns: number,
      rows: number,
    ) => {
      grid.value = { columns, rows };
      const totalLetters = columns * rows;
      letters.value = Array.from(
        { length: totalLetters },
        () => ({
          char: getRandomChar()!,
          color: getRandomColor()!,
          targetColor: getRandomColor()!,
          colorProgress: 1,
        }),
      );
    };

    const resizeCanvas = () => {
      const canvas = canvasRef.value;
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;

      const parentWidth =
        parent.parentElement?.offsetWidth ||
        parent.offsetWidth ||
        window.innerWidth;
      const parentHeight =
        parent.parentElement?.offsetHeight ||
        parent.offsetHeight ||
        window.innerHeight;

      const width = Math.max(parentWidth, 300);
      const height = Math.max(parentHeight, 300);

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      if (context.value) {
        context.value.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const charConfig = getCharConfig();

      const { columns, rows } = calculateGrid(
        width,
        height,
        charConfig,
      );
      initializeLetters(columns, rows);
      drawLetters(charConfig);
    };

    const drawLetters = ({
      charWidth,
      charHeight,
      fontSize,
    }: ReturnType<typeof getCharConfig>) => {
      if (!context.value || letters.value.length === 0)
        return;
      const ctx = context.value;
      const { width, height } =
        canvasRef.value!.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = 'top';

      letters.value.forEach((letter, index) => {
        const x = (index % grid.value.columns) * charWidth;
        const y =
          Math.floor(index / grid.value.columns) *
          charHeight;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    };

    const updateLetters = () => {
      if (!letters.value || letters.value.length === 0)
        return;

      const updateCount = Math.max(
        1,
        Math.floor(letters.value.length * 0.05),
      );

      for (let i = 0; i < updateCount; i++) {
        const index = Math.floor(
          Math.random() * letters.value.length,
        );
        if (!letters.value[index]) continue;

        letters.value[index].char = getRandomChar()!;
        letters.value[index].targetColor =
          getRandomColor()!;

        letters.value[index].color =
          letters.value[index].targetColor;
        letters.value[index].colorProgress = 1;
      }
    };
    let resizeTimeout: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    };

    let resizeObserver: ResizeObserver | null = null;

    onMounted(() => {
      const canvas = canvasRef.value;
      if (!canvas) return;

      context.value = canvas.getContext('2d');

      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(rootElement.value!);
    });

    onUnmounted(() => {
      resizeObserver?.disconnect();
      resizeObserver = null;
    });

    return () => {
      return (
        <div
          ref={rootElement}
          class={cn(
            'overflow-hidden relative top-0 left-0 w-full h-full',
            props.class,
          )}
        >
          <canvas
            ref={canvasRef}
            class="absolute top-0 left-0 w-full h-full"
          />
        </div>
      );
    };
  },
});
