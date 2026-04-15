/** Binary rain from maxirchain-style hero — duplicated blocks for seamless vertical loop. */

const BINARY_LINES = [
  "010010001111111011000011010111",
  "011010000001111111010111111000",
  "110100000010100011001000010001",
  "100010110111101111110101010110",
  "010010010110111111010000100000",
  "000010000011101111100001001011",
  "100111111100100100010100011101",
  "101001010100000001101101101110",
  "111101101110011100001110010000",
  "010011010110010100000100010001",
  "010110010001110100001001001011",
  "101011000010011101000000001111",
  "000001110010001001010010000011",
  "110011001001101010010101000111",
  "100011110011110100010100000010",
] as const;

const COLUMN_COUNT = 12;

function ColumnBlock() {
  return (
    <>
      {BINARY_LINES.map((line) => (
        <div
          key={line}
          className="whitespace-nowrap py-0.5 tracking-tight text-amber-200/90"
        >
          {line}
        </div>
      ))}
    </>
  );
}

export function BinaryColumns() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 flex h-full min-h-full justify-between gap-0 px-0.5 opacity-[0.14] sm:opacity-[0.22]"
      aria-hidden
    >
      {Array.from({ length: COLUMN_COUNT }).map((_, colIdx) => {
        const duration = 22 + (colIdx % 6) * 3;
        return (
          <div
            key={colIdx}
            className="relative h-full min-h-0 w-full max-w-[3.25rem] overflow-hidden border-l border-amber-400/[0.07] sm:max-w-[4rem] md:max-w-[4.5rem]"
          >
            <div
              className="hero-binary-scroll flex flex-col font-mono text-[7px] leading-snug sm:text-[9px] md:text-[11px]"
              style={{ animationDuration: `${duration}s` }}
            >
              <ColumnBlock />
              <ColumnBlock />
            </div>
          </div>
        );
      })}
    </div>
  );
}
