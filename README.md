# Cinemahub

**cinemahub**는 다양한 국가의 트랜드 영화와 영화인의 정보를 확인하고 리뷰를 작성하고 팔로우 기능을 통해 유저의 관심 영화와 리뷰룰 확인할 수 있는 애플리케이션입니다.

## 🚀 기술 스택

### Frontend

- React, TypeScript, TailwindCSS, Zustand, Axios, React-Router

### Backend

- Node.js, Express, MongoDB, Mongoose

### DevOps

- GCP, Nginx

## 📌 담당 페이지

### 메인 페이지 [메인페이지 링크](https://cinemahub.chanhoportfolio.com)

- MouseEvent.clientX, react Children.toArray로 드래그로 넘기는 무한캐러샐 구현
- useRef, getBoundingClientRect로 드래그와, 횡스크롤로 움직이는 캐러샐 구현

[메인페이지](https://github.com/cksgh5654/cinemahub-front/blob/main/src/pages/MainPage.tsx)
[무한캐러샐](https://github.com/cksgh5654/react-ui-kit/tree/main/src/components/CarouselInfinite)
[횡스크롤캐러샐](https://github.com/cksgh5654/react-ui-kit/tree/main/src/components/CarouselXscroll)

---

### 영화 및 영화인 상세 페이지 [영화 상세페이지 링크](https://cinemahub.chanhoportfolio.com/?movie=447273) [영화인 상세페이지 링크](https://cinemahub.chanhoportfolio.com/?person=90633)

- createPortal로 만든 모달 컴포넌트에 zustand로 전역상태로 페이지 값을 가져와서 모달 형태의 페이지 구현
- 페이지네이션으로 포스터, 인물 이미지를 페이지로 분할하여 데이터 로드

[영화상세페이지](https://github.com/cksgh5654/cinemahub-front/blob/main/src/pages/CinemaDetailPage.tsx)
[영화인상세페이지](https://github.com/cksgh5654/cinemahub-front/blob/main/src/pages/PersonDetailPage.tsx)
[모달](https://github.com/cksgh5654/react-ui-kit/tree/main/src/components/Modal)
[모달페이지](https://github.com/cksgh5654/cinemahub-front/blob/main/src/components/PageModal.tsx)
[페이지네이션](https://github.com/cksgh5654/react-ui-kit/tree/main/src/components/Pagination)

---

### 장르별 영화 페이지 [장르 페이지 링크](https://cinemahub.chanhoportfolio.com/genre/28)

- IntersectionObserver로 무한 스크롤을 구현해 데이터 로딩 속도를 최적화하고 사용자 경험을 개선
- popover api를 사용한 셀렉트 버튼으로 인기순, 최신순, 이름순으로 정렬하여 데이터 불러오기

[장르 페이지](https://github.com/cksgh5654/cinemahub-front/blob/main/src/pages/GenrePage.tsx)
[무한스크롤 훅](https://github.com/cksgh5654/cinemahub-front/blob/main/src/hooks/useInfinite.ts)
[셀렉트](https://github.com/cksgh5654/react-ui-kit/tree/main/src/components/Select)

## 📌 링크

- **Frontend Repository**: [Cinemahub Frontend](https://github.com/cksgh5654/cinemahub-front)
- **Backend Repository**: [Cinemahub Backend](https://github.com/cksgh5654/cinemahub-back)
- **Figma**: [Cinemahub Figma](https://www.figma.com/design/n5uMDvi0vZ69mcXVQHQJfw/%EC%98%81%ED%99%94?node-id=0-1&t=MzqjfrlrLNnCsE5i-1)
- **WebSite**: [Cinemahub](https://cinemahub.chanhoportfolio.com)
- **My Resume**: [My Resume](https://www.chanhoportfolio.com)

## 📌 설치 및 실행 방법

### 프론트엔드 실행

```bash
npm install
npm run dev
```

### 백엔드 실행

```bash
npm install
node index.js
```
