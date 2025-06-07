# Melhores Práticas do Projeto

Este documento reúne as melhores práticas adotadas neste projeto, baseando-se no padrão de tipagem, organização de Redux Sagas, criação de componentes e demais fluxos utilizados.

---

## 1. Tipagem de Componentes React

- Sempre tipar as props dos componentes usando `type` ou `interface` separada.
- Exemplo:
  ```tsx
  type AddFavoriteButtonProps = {
    episodeData: Episode
    favorites: Episode[]
  }

  const AddFavoriteButton: React.FC<AddFavoriteButtonProps> = ({ episodeData, favorites }) => { ... }
  ```

- Para componentes que não recebem props, não é necessário tipar explicitamente.

---

## 2. Organização e Tipagem do Redux

### 2.1 Estrutura dos Types

- Centralize todos os tipos, actions e interfaces em um arquivo `types.ts` na pasta do reducer.
- Exemplo de definição de actions:
  ```ts
  export type EpisodesActions =
    | { type: typeof FETCH_EPISODES_SUCCESS; payload: EpisodesResponse }
    | { type: typeof FETCH_EPISODES_FAILURE; payload: string }
    | { type: typeof ADD_FAVORITE_EPISODE; payload: Episode }
    | { type: typeof REMOVE_FAVORITE_EPISODE; payload: string }
    | { type: typeof ADD_WATCHED_EPISODE; payload: Episode }
    | { type: typeof REMOVE_WATCHED_EPISODE; payload: string };
  ```

- Sempre tipar o estado do reducer:
  ```ts
  export interface EpisodesState {
    data: EpisodesResponse | null;
    loading: boolean;
    error: string | null;
    favorites: Episode[];
    watched: Episode[];
    episodeDetails: {
      data: null,
      loading: false,
      error: null
    }
  }
  ```

### 2.2 Reducer

- Sempre use `...state` ao retornar um novo estado para garantir que nenhuma propriedade seja perdida.
- O `default` do switch deve ser apenas `return state;`.

---

## 3. Redux Saga

- Separe as sagas em arquivos próprios, agrupando por domínio (ex: `episodes/sagas.ts`).
- Use `takeLatest` para ações de busca e side effects.
- Exemplo:
  ```ts
  function* fetchEpisodesSaga(action: FetchEpisodesAction): SagaIterator {
    try {
      const { page, name } = action.payload;
      const data: EpisodesResponse = yield call(fetchEpisodesService, page, name);
      yield put(fetchEpisodesSuccess(data));
    } catch (error: unknown) {
      yield put(fetchEpisodesFailure('Erro ao buscar episódios'));
    }
  }
  ```

- Exporte uma saga raiz para ser usada no `rootSaga`:
  ```ts
  export default function* EpisodesSaga() {
    yield takeLatest(FETCH_EPISODES_REQUEST, fetchEpisodesSaga);
    yield takeLatest(FETCH_EPISODE_BY_ID_REQUEST, fetchEpisodeByIdSaga);
  }
  ```

---

## 4. Organização dos Componentes

- Separe componentes por domínio em pastas (`components/card`, `components/button`, etc).
- Componentes de botão devem ser reutilizáveis e receber as props necessárias para funcionar em qualquer contexto.
- Use sempre o padrão de tipagem explícita nas props.

---

## 5. Utilização do Material UI

- Prefira o uso do sistema de estilização do Material UI (`styled`, `sx`) ao invés de CSS puro.
- Exemplo:
  ```tsx
  const NavbarContainer = styled('div')(() => ({
    backgroundColor: '#212121',
    height: 80,
    display: 'flex',
    ...
  }));
  ```

---

## 6. Funções Utilitárias

- Centralize funções utilitárias em `src/utils/functions.ts`.
- Sempre tipar os parâmetros e retorno das funções utilitárias.
- Exemplo:
  ```ts
  export const isFavorite = (id: string | undefined, favorites: Episode[]) =>
    favorites?.some((ep: Episode) => ep.id === id);
  ```

---

## 7. Organização do Store

- Use `configureStore` do Redux Toolkit para criar a store.
- Centralize o uso do `useAppSelector` tipado.
- Exemplo:
  ```ts
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  ```

---

## 8. Convenções Gerais

- Use nomes de arquivos e pastas em minúsculo e separados por hífen ou camelCase.
- Use nomes de variáveis e funções em inglês, exceto textos exibidos ao usuário.
- Prefira funções puras e componentes funcionais.

---

## 9. Boas práticas de código

- Não deixe código morto ou comentado no repositório.
- Sempre use tipagem explícita para evitar erros em tempo de execução.
- Prefira hooks do React e Redux ao invés de classes.
- Separe lógica de negócio (Redux, sagas, utils) da camada de apresentação (componentes).

---

## 10. Documentação

- Mantenha este arquivo atualizado sempre que um novo padrão for adotado.
- Documente exemplos de uso para novos componentes reutilizáveis.

---

## 11. Testes

- Todo novo reducer, action ou função utilitária deve ter testes automatizados.
- Utilize o [Vitest](https://vitest.dev/) para testes unitários e de integração.
- Os arquivos de teste devem seguir o padrão `<nome-do-arquivo>.test.ts`.
- Garanta cobertura mínima para os principais fluxos do Redux (reducers, actions) e componentes reutilizáveis.
- Exemplo de teste básico para reducer:
  ```ts
  import { describe, it, expect } from 'vitest'
  import EpisodesReducer from './reducer'
  import { addFavoriteEpisode } from './actions'

  describe('EpisodesReducer', () => {
    it('deve adicionar episódio aos favoritos', () => {
      const initialState = { favorites: [], watched: [], ... }
      const mockEpisode = { id: '1', ... }
      const nextState = EpisodesReducer(initialState, addFavoriteEpisode(mockEpisode))
      expect(nextState.favorites).toContainEqual(mockEpisode)
    })
  })
  ```

---