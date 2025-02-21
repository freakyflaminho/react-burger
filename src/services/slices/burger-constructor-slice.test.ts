import reducer, {
  addBun,
  addIngredient,
  changeIngredientPosition,
  initialState,
  removeIngredient,
} from './burger-constructor-slice';
import { nanoid } from '@reduxjs/toolkit';

jest.mock('@reduxjs/toolkit', () => {
  const original = jest.requireActual('@reduxjs/toolkit');
  return {
    __esModule: true,
    ...original,
    nanoid: jest.fn().mockImplementation(() => '123456789'),
  };
});

describe('test burger-constructor-slice reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: 'unknown' }))
      .toEqual(initialState);
  });

  it('should add bun if bun not exists', () => {
    expect(reducer(initialState, addBun('bun1')))
      .toEqual({ bun: 'bun1', ingredients: [] });
  });

  it('should change bun if bun exists', () => {
    expect(reducer({ bun: 'bun1', ingredients: [] }, addBun('bun2')))
      .toEqual({ bun: 'bun2', ingredients: [] });
  });

  it('should add ingredient if ingredients not exists', () => {
    expect(reducer(initialState, addIngredient('sauce1')))
      .toEqual({ bun: null, ingredients: [{ 'id': 'sauce1', 'posId': nanoid() }] });
  });

  it('should add new ingredient if ingredients exists', () => {
    expect(reducer({ bun: null, ingredients: [{ 'id': 'sauce1', 'posId': nanoid() }] }, addIngredient('main1')))
      .toEqual({
        bun: null,
        ingredients: [
          { 'id': 'sauce1', 'posId': nanoid() },
          { 'id': 'main1', 'posId': nanoid() },
        ],
      });
  });

  it('should remove first ingredient', () => {
    expect(reducer({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
      ],
    }, addIngredient('main1'))).toEqual({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
        { 'id': 'main1', 'posId': nanoid() },
      ],
    });
  });

  it('should remove second ingredient', () => {
    expect(reducer({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
        { 'id': 'main1', 'posId': nanoid() },
      ],
    }, removeIngredient(0))).toEqual({
      bun: null,
      ingredients: [
        { 'id': 'main1', 'posId': nanoid() },
      ],
    });
  });

  it('should remove second ingredient', () => {
    expect(reducer({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
        { 'id': 'main1', 'posId': nanoid() },
      ],
    }, removeIngredient(1))).toEqual({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
      ],
    });
  });

  it('should change first ingredient position from 0 to 1', () => {
    expect(reducer({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
        { 'id': 'main1', 'posId': nanoid() },
      ],
    }, changeIngredientPosition(0, 1))).toEqual({
      bun: null,
      ingredients: [
        { 'id': 'main1', 'posId': nanoid() },
        { 'id': 'sauce1', 'posId': nanoid() },
      ],
    });
  });

  it('should change first ingredient position from 1 to 0', () => {
    expect(reducer({
      bun: null,
      ingredients: [
        { 'id': 'sauce1', 'posId': nanoid() },
        { 'id': 'main1', 'posId': nanoid() },
      ],
    }, changeIngredientPosition(1, 0))).toEqual({
      bun: null,
      ingredients: [
        { 'id': 'main1', 'posId': nanoid() },
        { 'id': 'sauce1', 'posId': nanoid() },
      ],
    });
  });
});
