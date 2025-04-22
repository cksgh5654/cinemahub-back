# <img src="https://github.com/user-attachments/assets/3067ce67-7023-4968-b818-43a0e355e4ff" width="28" height="28"> Blahblah

**cinemahub**는 다양한 국가의 트랜드 영화와 영화인의 정보를 확인하고 리뷰를 작성하고 팔로우 기능을 통해 유저의 관심 영화와 리뷰룰 확인할 수 있는 애플리케이션입니다.

## 🚀 기술 스택

### Frontend

- React, TypeScript, TailwindCSS, Zustand, Axios, React-Router

### Backend

- Node.js, Express, MongoDB, Mongoose

### DevOps

- GCP, Nginx

## 📌 담당 기능

### 메인 페이지: 동적 UI와 데이터 안정성 문제 해결

#### 문제

사용자에게 시각적으로 매력적이고 몰입감 있는 첫인상을 제공하면서, 다양한 화면 크기에 맞는 유연한 UI를 구현해야 했습니다. 또한, 외부 API 의존으로 인해 데이터 호출 실패 시 사용자 경험이 저하될 가능성이 있었습니다.

#### 해결 방식

- **동적 UI 최적화**: 첫 번째 섹션의 오늘의 트렌드 영화 예고편은 브라우저 width에 맞게 동적으로 크기를 조정하도록 구현했습니다. 이를 통해 모든 디바이스에서 예고편이 화면에 꽉 차게 재생되어 시각적 몰입감을 극대화했습니다. 장르별 영화, 이번 주 트렌드 영화, 인기 배우 섹션은 width 제한을 제거하여 고해상도 화면에서 더 많은 콘텐츠를 한눈에 확인할 수 있도록 했습니다.
- **데이터 안정성 강화**: TMDB API 호출 실패 가능성에 대비해 매일 자정에 영화 및 영화인 데이터를 MongoDB에 업데이트하도록 설정했습니다. 트렌드 영화 데이터는 빠른 접근을 위해 LRUCache를 활용해 메모리에 캐싱하여 API 호출 부하를 줄이고 응답 속도를 개선했습니다.

---

### 영화 및 영화인 상세 페이지: 데이터 중복 호출과 UX 문제 해결

#### 문제

상세 페이지에서 매번 TMDB API를 호출하면 응답 시간이 길어지고, API 호출 횟수 제한에 걸릴 위험이 있었습니다. 또한, 모달 형태의 상세 페이지를 제공하면서도 URL 공유와 같은 페이지 수준의 기능을 지원해야 했습니다.

#### 해결 방식

- **데이터 호출 최적화**: 사용자가 상세 정보를 처음 클릭하면 영화 상세 정보, 스틸 이미지, 포스터, 인물 상세 정보, 참여 영화, 인물 사진 데이터를 각각 MongoDB에 저장하도록 설계했습니다. 이후 동일한 데이터 요청 시 DB에서 즉시 불러와 API 호출 횟수를 최소화했습니다. 이를 통해 응답 속도를 높이고 API 사용량을 효율적으로 관리했습니다.
- **UX 개선**: 상세 페이지를 1280px 크기의 모달로 구현하여 직관적인 UI를 제공했습니다. 모달 외부 클릭 시 이전 화면으로 돌아가도록 설정해 사용자 편의성을 높였습니다. 동시에, 모달이 독립된 페이지처럼 동작하도록 URL 공유 기능을 추가하여 모달의 한계를 극복하고, 소셜 공유 및 접근성을 강화했습니다.

---

### 카테고리별 영화 페이지: 데이터 로딩과 스케일링 문제 해결

#### 문제

대량의 영화 데이터를 효율적으로 표시하면서, 다양한 해상도에서 최적의 콘텐츠 노출을 보장해야 했습니다. 또한, 한 번에 모든 데이터를 로드하면 성능 저하가 발생할 가능성이 있었습니다.

#### 해결 방식

- **유연한 UI 설계**: width 제한을 두지 않아 고해상도 화면에서 더 많은 영화 데이터를 한눈에 확인할 수 있도록 했습니다. 인기순, 최신순, 이름순 정렬 기능을 추가해 사용자 맞춤 탐색을 지원했습니다.
- **성능 최적화**: 무한 스크롤을 구현하여 한 번에 모든 데이터를 로드하지 않고, 사용자가 스크롤할 때 필요한 데이터만 점진적으로 로드하도록 설계했습니다. 이를 통해 초기 로딩 속도를 개선하고 서버 부하를 줄였습니다. MongoDB에 저장된 영화 데이터를 카테고리별로 효율적으로 쿼리하여 데이터 접근 속도를 최적화했습니다.

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
