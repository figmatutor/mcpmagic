# Contributing to Figma MCP Prompts

We welcome contributions from the community! This document explains how to add your own MCP prompts to help others automate their Figma workflows.

## 🚀 Quick Start

### Option 1: Submit via GitHub Issue (Recommended)
The easiest way to contribute your prompt:

1. **[Create a New Issue](https://github.com/figmatutor/mcpmagic/issues/new)**
2. Choose "Prompt Submission" template
3. Fill out the template with your prompt details
4. Submit and we'll review it for inclusion

### Option 2: Fork & Pull Request
For developers who want to contribute directly:

1. **Fork this repository**
2. **Clone your fork locally**
3. **Create a new branch** for your prompt
4. **Add your prompt file** in `content/prompts/`
5. **Submit a Pull Request**

## 📝 Prompt Format

Your prompt should be a `.mdx` file with the following frontmatter:

```markdown
---
title: Your Prompt Title
category: auto-populate | annotation | overrides | connectors | vibe-design
tags:
  - relevant
  - tags
  - here
language: English | 한국어 | 中文
---

# Prompt

Your prompt content here...

# How to Use

1. Step-by-step instructions
2. Screenshots if helpful
3. Expected results

# Reference

Add a link to the Figma file where you used the prompt.
```

## 🏷️ Categories

Choose the most appropriate category:

- **auto-populate**: Automating content generation and population
- **annotation**: Adding specs, comments, and documentation
- **overrides**: Managing component instances and overrides
- **connectors**: Creating connections and flow diagrams
- **vibe-design**: Creative and design exploration prompts

## 🌍 Language Support

We support multiple languages:
- **English**: Primary language
- **한국어**: Korean
- **中文**: Chinese (Simplified)

## ✅ Guidelines

### Content Guidelines
- ✅ Provide clear, step-by-step instructions
- ✅ Include practical examples
- ✅ Test your prompt before submitting
- ✅ Use proper grammar and formatting
- ✅ Add relevant tags for discoverability

### Technical Guidelines
- ✅ Follow the frontmatter format exactly
- ✅ Use kebab-case for filenames: `your-prompt-name.mdx`
- ✅ Place files in `content/prompts/` directory
- ✅ Ensure all links work properly

## 🔍 Review Process

1. **Submission**: Submit via issue or PR
2. **Review**: Our team reviews for quality and relevance
3. **Feedback**: We may request changes or improvements
4. **Merge**: Approved prompts are added to the collection
5. **Publication**: Your prompt goes live on the website

## 💡 Tips for Great Prompts

- **Be Specific**: Clear instructions work better than vague ones
- **Show Results**: Include screenshots of expected outcomes
- **Consider Edge Cases**: Think about different scenarios
- **Keep It Simple**: Break complex tasks into steps
- **Add Context**: Explain when and why to use the prompt

## 🆘 Need Help?

- **Questions?** [Open a Discussion](https://github.com/figmatutor/mcpmagic/discussions)
- **Bug Reports?** [Create an Issue](https://github.com/figmatutor/mcpmagic/issues)
- **Feature Ideas?** [Start a Discussion](https://github.com/figmatutor/mcpmagic/discussions)

---

# 한국어 기여 가이드

커뮤니티의 기여를 환영합니다! 이 문서는 Figma 워크플로우 자동화를 위한 MCP 프롬프트를 추가하는 방법을 설명합니다.

## 🚀 빠른 시작

### 방법 1: GitHub 이슈로 제출 (추천)
가장 쉬운 기여 방법:

1. **[새 이슈 생성](https://github.com/figmatutor/mcpmagic/issues/new)**
2. "Prompt Submission" 템플릿 선택
3. 프롬프트 세부사항으로 템플릿 작성
4. 제출하면 검토 후 포함 여부 결정

### 방법 2: 포크 & 풀 리퀘스트
직접 기여하고 싶은 개발자를 위한 방법:

1. **이 레포지토리 포크**
2. **포크한 레포지토리를 로컬에 클론**
3. **프롬프트용 새 브랜치 생성**
4. **`content/prompts/`에 프롬프트 파일 추가**
5. **풀 리퀘스트 제출**

## 📝 프롬프트 형식

프롬프트는 다음 frontmatter를 포함한 `.mdx` 파일이어야 합니다:

```markdown
---
title: 프롬프트 제목
category: auto-populate | annotation | overrides | connectors | vibe-design
tags:
  - 관련
  - 태그
  - 여기에
language: English | 한국어 | 中文
---

# Prompt

프롬프트 내용...

# How to Use

1. 단계별 사용법
2. 도움이 되는 스크린샷
3. 예상 결과

# Reference

프롬프트 사용한 Figma 파일 링크를 추가해주세요.
```

## 🏷️ 카테고리

가장 적절한 카테고리 선택:

- **auto-populate**: 콘텐츠 생성 및 자동 입력
- **annotation**: 스펙, 주석, 문서화 추가
- **overrides**: 컴포넌트 인스턴스 및 오버라이드 관리
- **connectors**: 연결선 및 플로우 다이어그램 생성
- **vibe-design**: 창의적이고 탐색적인 디자인 프롬프트

## 🌍 언어 지원

다음 언어를 지원합니다:
- **English**: 기본 언어
- **한국어**: 한국어
- **中文**: 중국어(간체)

## ✅ 가이드라인

### 콘텐츠 가이드라인
- ✅ 명확하고 단계별 지침 제공
- ✅ 실용적인 예시 포함
- ✅ 제출 전 프롬프트 테스트
- ✅ 올바른 문법과 서식 사용
- ✅ 검색 가능하도록 관련 태그 추가

### 기술적 가이드라인
- ✅ frontmatter 형식을 정확히 따르기
- ✅ 파일명에 kebab-case 사용: `your-prompt-name.mdx`
- ✅ `content/prompts/` 디렉토리에 파일 배치
- ✅ 모든 링크가 제대로 작동하는지 확인

## 🔍 검토 과정

1. **제출**: 이슈 또는 PR로 제출
2. **검토**: 품질과 관련성에 대해 팀에서 검토
3. **피드백**: 변경사항이나 개선사항 요청 가능
4. **병합**: 승인된 프롬프트는 컬렉션에 추가
5. **게시**: 웹사이트에 프롬프트가 게시됨

## 💡 좋은 프롬프트를 위한 팁

- **구체적으로**: 모호한 것보다 명확한 지침이 더 효과적
- **결과 보여주기**: 예상 결과의 스크린샷 포함
- **예외 상황 고려**: 다양한 시나리오에 대해 생각
- **단순하게 유지**: 복잡한 작업을 단계별로 나누기
- **맥락 추가**: 언제, 왜 프롬프트를 사용해야 하는지 설명

## 🆘 도움이 필요한가요?

- **질문?** [토론 시작하기](https://github.com/figmatutor/mcpmagic/discussions)
- **버그 리포트?** [이슈 생성하기](https://github.com/figmatutor/mcpmagic/issues)
- **기능 아이디어?** [토론 시작하기](https://github.com/figmatutor/mcpmagic/discussions)

---

## 🙏 Thank You

Thank you for contributing to the Figma MCP community! Every prompt helps designers work more efficiently and creatively.

기여해주셔서 감사합니다! 모든 프롬프트는 디자이너들이 더 효율적이고 창의적으로 작업할 수 있도록 도움을 줍니다. 