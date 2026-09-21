# Task Cost Split App

Aplicativo mobile para **divisão de custos em tarefas, compras e viagens**. Permite criar atividades (ex.: uma viagem ou um grupo de despesas compartilhadas), adicionar participantes, registrar despesas e acompanhar o saldo de quem deve e quem tem a receber, com um resumo consolidado de estatísticas do usuário.

Este projeto foi desenvolvido como desafio da formação **React Native da [Rocketseat](https://www.rocketseat.com.br/)**.

- **Design/protótipo:** construído a partir do protótipo no Figma [Divisão de Despesas](https://www.figma.com/community/file/1564725760418771079/divisao-de-despesas).
- **Backend/API:** consome os recursos disponibilizados pela API de referência [swift-expense-split-api](https://github.com/rocketseat-education/swift-expense-split-api), mantida pela Rocketseat.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (LTS mais recente)
- [Bun](https://bun.sh/) — o projeto usa `bun.lock` como lockfile
- [Git](https://git-scm.com/)
- Ambiente nativo configurado para rodar **development build**, já que o app depende de módulos nativos incompatíveis com o Expo Go (veja a seção abaixo):
  - **Android:** Android Studio + SDK/emulador configurados (ou um dispositivo físico com depuração USB habilitada)
  - **iOS (apenas macOS):** Xcode + CocoaPods
- A API [swift-expense-split-api](https://github.com/rocketseat-education/swift-expense-split-api) clonada e rodando localmente — o app consome a API em `http://localhost:8080/api/v1` (iOS) ou `http://<IP-da-sua-máquina>:8080/api/v1` (Android), conforme configurado em [src/api/taskCostSplit.ts](src/api/taskCostSplit.ts). Ajuste o IP de acordo com a rede em que o emulador/dispositivo físico está.

## Como executar

### 1. Instale as dependências

```bash
bun install
```

### 2. Suba a API localmente

Clone e execute o [swift-expense-split-api](https://github.com/rocketseat-education/swift-expense-split-api) seguindo as instruções do próprio repositório, garantindo que ela esteja acessível na porta `8080`.

### 3. Gere e execute o development build

> ⚠️ **Este projeto não roda no Expo Go.** Ele utiliza `@expo/ui`, que expõe componentes nativos (como o `DateTimePicker` usado no [InputDatePicker](src/components/ui/InputDatePicker/index.tsx)) que não fazem parte do conjunto de módulos nativos embarcados no Expo Go. É necessário gerar um **development build** para rodar o app.

Gere o build nativo e instale-o no emulador/dispositivo (isso também gera as pastas `android/` e `ios/` via Continuous Native Generation, caso ainda não existam):

```bash
# Android
bunx expo run:android

# iOS (apenas macOS)
bunx expo run:ios
```

### 4. Inicie o servidor de desenvolvimento

Com o development build já instalado no dispositivo/emulador, os próximos ciclos de desenvolvimento podem usar apenas o Metro:

```bash
bunx expo start
```

Escaneie o QR Code ou selecione o dispositivo/emulador — o app abrirá usando o development build instalado (não o Expo Go).

> Prefira sempre `npx expo install <pacote>` (ou `bunx expo install <pacote>`) ao adicionar novas dependências, para garantir compatibilidade com a versão do SDK do Expo usada no projeto.

### Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `bun run start` | Inicia o servidor de desenvolvimento (Metro) |
| `bun run android` | Builda e executa o development build no Android |
| `bun run ios` | Builda e executa o development build no iOS |
| `bun run web` | Inicia o app no navegador (suporte experimental) |
| `bun run lint` | Executa o ESLint em `src` |
| `bun run lint:fix` | Executa o ESLint com correção automática |

Antes de finalizar qualquer alteração, rode:

```bash
bunx expo lint
bunx tsc --noEmit
```

## Arquitetura: MVVM

O projeto segue o padrão **MVVM (Model-View-ViewModel)**, com uma separação explícita de responsabilidades em cada tela/feature dentro de `src/viewModels/`:

- **View** (`*.view.tsx`) — componente de UI puro, responsável apenas por renderização. Não contém regra de negócio: todo estado e comportamento vêm do ViewModel via hook.
- **ViewModel** (`use*ViewModel.ts`) — hook que concentra o estado da tela e a lógica de apresentação: orquestra formulários (React Hook Form), chamadas à API (React Query), navegação (Expo Router) e feedback ao usuário (toasts), expondo apenas o que a View precisa consumir.
- **Scheme** (`*.scheme.ts`) — schema de validação (Zod) do formulário associado ao ViewModel, junto com o tipo dos dados do formulário.
- **Model** — representado pelas camadas de **interfaces HTTP** (`src/interfaces/http`), **services** (`src/services`) e pelo **cliente HTTP** (`src/api`), que definem os contratos de dados e o acesso à API.

Exemplo (`src/viewModels/Signin/`):

```
signin.scheme.ts        # validação Zod + tipagem do formulário
signin.view.tsx          # UI (View)
useSigninViewModel.ts     # estado e lógica (ViewModel)
```

As rotas em `src/app/` (Expo Router) permanecem enxutas, apenas conectando cada rota à sua respectiva `View`/`ViewModel` correspondente em `src/viewModels/`, mantendo a navegação desacoplada da lógica de tela.

## Tecnologias e ferramentas

### Core

- [React Native](https://reactnative.dev/) `0.86` + [React](https://react.dev/) `19`
- [Expo (SDK 57)](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/) — navegação baseada em arquivos
- [TypeScript](https://www.typescriptlang.org/)

### UI e estilização

- [NativeWind](https://www.nativewind.dev/) + [Tailwind CSS](https://tailwindcss.com/) — estilização via classes utilitárias
- `tailwind-merge` / `tailwind-variants` — composição e variantes de estilos
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) + [React Native Worklets](https://www.npmjs.com/package/react-native-worklets) — animações
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) — gestos
- [React Native Screens](https://github.com/software-mansion/react-native-screens) + [React Native Safe Area Context](https://github.com/AppAndFlow/react-native-safe-area-context)
- [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/) — bottom sheets
- [React Native SVG](https://github.com/software-mansion/react-native-svg) (com `react-native-svg-transformer` para importar `.svg` como componente)
- [@expo/ui](https://docs.expo.dev/versions/latest/sdk/ui/) — componentes nativos (ex.: `DateTimePicker`), **exige development build**
- [react-native-currency-input](https://github.com/lucianocardoso/react-native-currency-input) — input de valores monetários
- [react-native-toast-message](https://github.com/calintamas/react-native-toast-message) — notificações toast
- [@expo-google-fonts/inter](https://github.com/expo/google-fonts) e [@expo-google-fonts/sora](https://github.com/expo/google-fonts) — tipografia (Inter e Sora) via `expo-font`

### Estado, dados e formulários

- [TanStack React Query](https://tanstack.com/query/latest) — cache, fetching e mutações de dados remotos (`src/queries`)
- [Zustand](https://zustand-demo.pmnd.rs/) — estado global local (usuário autenticado, modais, bottom sheets — `src/store`)
- [React Hook Form](https://react-hook-form.com/) + [@hookform/resolvers](https://github.com/react-hook-form/resolvers) — gerenciamento de formulários
- [Zod](https://zod.dev/) — validação de schemas e tipagem dos formulários
- [Axios](https://axios-http.com/) — cliente HTTP, com interceptor de autenticação via `Authorization: Bearer` (`src/api`)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) — persistência local (sessão do usuário)
- [date-fns](https://date-fns.org/) — manipulação de datas

### Qualidade de código

- [ESLint](https://eslint.org/) (com `eslint-config-brunoazevedo`) e [Prettier](https://prettier.io/) (com `prettier-plugin-tailwindcss`)
