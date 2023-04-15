/**
 * Функция для валидации параметров в функции get и set для бита в Uint8Array.
 * @param {Uint8Array} arrayOfUint8 Изначальный массив
 * @param {number} elementIndex Номер элемента в массиве
 * @param {number} bitIndex Индекс бита
 * @param {number} [bitNewValue] Новое значение бита
 */
function validateParamaters(
  arrayOfUint8: Uint8Array,
  elementIndex: number,
  bitIndex: number,
  bitNewValue?: number
) {
  if (elementIndex > arrayOfUint8.length - 1 || elementIndex < 0) {
    throw new Error(
      "The index of the element should be withing the length of the array"
    );
  }
  if (bitIndex > 7 || bitIndex < 0) {
    throw new Error("The index of the bit should be between 0 and 7");
  }
  if (bitNewValue && !(bitNewValue === 0 || bitNewValue === 1)) {
    throw new Error("The bit value should only be equal to 0 or 1");
  }
}

/**
 * Функция для получения конкретного бита и установки нового значения бита.
 * @param {Uint8Array} arrayOfUint8 Изначальный массив
 */
function createBitGetter(arrayOfUint8: Uint8Array) {
  return {
    get: function (elementIndex: number, bitIndex: number): number {
      validateParamaters(arrayOfUint8, elementIndex, bitIndex);
      return (arrayOfUint8[elementIndex] & (1 << bitIndex)) != 0 ? 1 : 0;
    },
    set: function (
      elementIndex: number,
      bitIndex: number,
      bitNewValue: number
    ): void {
      validateParamaters(arrayOfUint8, elementIndex, bitIndex, bitNewValue);
      if (bitNewValue) {
        arrayOfUint8[elementIndex] =
          arrayOfUint8[elementIndex] | (1 << bitIndex);
      } else {
        arrayOfUint8[elementIndex] =
          arrayOfUint8[elementIndex] & ~(1 << bitIndex);
      }
    },
  };
}

const bitGetter1 = createBitGetter(new Uint8Array([0b1110, 0b1101]));
console.log(bitGetter1.get(0, 1)); // 1
console.log(bitGetter1.get(1, 1)); // 0

const bitAccessor = createBitGetter(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitAccessor.set(0, 1, 0)); //
console.log(bitAccessor.get(0, 1)); // 0
