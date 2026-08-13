const youtube = (label, seconds) => [label, `https://youtu.be/-CDz4HTz5Iw?t=${seconds}`];
const weeklyTranscript = ["조코딩 주간 AI 뉴스 전사", "https://lilys.ai/digest/10708089/12552445?s=1&noteVersionId=9134574"];
const weeklyThreads = ["주간 뉴스 Threads 원문", "https://www.threads.com/share/BBQ_z0_RRt/"];

export const legacyCardSources = {
  weeklyJuly20: [
    [["조코딩 주간 AI 뉴스", "https://youtu.be/-CDz4HTz5Iw"], ["Threads 주간 정리", "https://www.threads.com/@choi.openai/post/DbQdpqSj1LC"]],
    [["Anthropic Claude Opus 5 발표", "https://www.anthropic.com/news/claude-opus-5"], youtube("조코딩 영상 1분 36초", 96)],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], youtube("조코딩 영상 23분 31초", 1411)],
    [["야코비안 반례 설명", "https://jacobianconjectures.com/jacobian/note/"], ["Lean 4 독립 검증", "https://zenodo.org/records/21514514"]],
    [["Nature Kimi K3 소개", "https://www.nature.com/articles/d41586-026-02281-2"], youtube("조코딩 영상 37분 52초", 2272)],
    [["Cursor 에이전트 스웜 실험", "https://cursor.com/ko/blog/agent-swarm-model-economics"], youtube("조코딩 영상 13분 24초", 804)],
    [["NVIDIA 한국 파트너십 발표", "https://blogs.nvidia.com/blog/ai-summit-korea-partners-and-nvidia/"], youtube("조코딩 영상 1시간 21분 42초", 4902)],
    [["Upstage Solar Open 2 발표", "https://www.upstage.ai/blog/ko/solar-open-2"], ["Motif-3 독립 평가", "https://artificialanalysis.ai/models/motif-0714"]]
  ],
  deepDive: [
    [["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"], ["Bun 공식 전환 기록", "https://bun.com/blog/bun-in-rust"]],
    [["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"], ["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"]],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], ["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"]],
    [["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"], ["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"]],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], ["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"]],
    [["Bun 공식 전환 기록", "https://bun.com/blog/bun-in-rust"], ["Bun Rust 전환 PR", "https://github.com/oven-sh/bun/pull/30412"]],
    [["Bun 공식 전환 기록", "https://bun.com/blog/bun-in-rust"]],
    [["Bun 공식 전환 기록", "https://bun.com/blog/bun-in-rust"], ["Bun Rust 전환 PR", "https://github.com/oven-sh/bun/pull/30412"]],
    [["Bun Rust 전환 PR", "https://github.com/oven-sh/bun/pull/30412"], ["Bun 공식 전환 기록", "https://bun.com/blog/bun-in-rust"]],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], ["Bun 공식 전환 기록", "https://bun.com/blog/bun-in-rust"]]
  ],
  weeklyJuly27: [
    [weeklyTranscript, weeklyThreads],
    [["OpenAI 수학 연구 자료", "https://cdn.openai.com/pdf/ten-proofs-oai.pdf"], ["야코비안 반례 독립 검증", "https://zenodo.org/records/21514514"]],
    [weeklyTranscript, weeklyThreads],
    [["DeepSeek 공식 모델 페이지", "https://huggingface.co/deepseek-ai"], weeklyThreads],
    [["Anthropic 공식 뉴스", "https://www.anthropic.com/news"], weeklyThreads],
    [["OpenAI 연구 자료", "https://openai.com/research/"], weeklyThreads],
    [["독파모 2차 모델 정리", "https://www.threads.com/share/GEMkPpZDX/"]],
    [["NVIDIA 한국 파트너십 발표", "https://blogs.nvidia.com/blog/ai-summit-korea-partners-and-nvidia/"], weeklyThreads],
    [["Dreamina 공식 서비스", "https://dreamina.capcut.com/"], weeklyTranscript],
    [["Google DeepMind 로보틱스", "https://deepmind.google/discover/blog/gemini-robotics-brings-ai-into-the-physical-world/"], weeklyTranscript],
    [["OpenAI 수학 연구 자료", "https://cdn.openai.com/pdf/ten-proofs-oai.pdf"], ["사이클 이중 덮개 증명 해설", "https://arxiv.org/abs/2607.16356"]]
  ],
  genoffice: [
    [["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"], ["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["AI Wire 소개", "https://aiwire.kr/case/genspark-genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["AI Wire 소개", "https://aiwire.kr/case/genspark-genoffice"]],
    [["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"], ["AI Wire 소개", "https://aiwire.kr/case/genspark-genoffice"]],
    [["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"], ["AI Wire 소개", "https://aiwire.kr/case/genspark-genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"]],
    [["GenOffice GitHub 저장소", "https://github.com/genspark-ai/genoffice"], ["GenOffice 공식 페이지", "https://www.genspark.ai/genoffice"]]
  ],
  qwen: [
    [["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"], ["GeekNews 정리", "https://news.hada.io/topic?id=32216"]],
    [["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"], ["Qwen Hugging Face", "https://huggingface.co/Qwen"]],
    [["Artificial Analysis Agentic Index", "https://artificialanalysis.ai/?intelligence=agentic-index#intelligence"], ["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"]],
    [["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"], ["GeekNews 정리", "https://news.hada.io/topic?id=32216"]],
    [["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"]],
    [["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"], ["GeekNews 정리", "https://news.hada.io/topic?id=32216"]],
    [["Qwen3.8 공식 발표", "https://qwen.ai/blog?id=qwen3.8"], ["Qwen Hugging Face", "https://huggingface.co/Qwen"]],
    [["Qwen Hugging Face", "https://huggingface.co/Qwen"], ["GeekNews 정리", "https://news.hada.io/topic?id=32216"]],
    [["Artificial Analysis Qwen 분석", "https://artificialanalysis.ai/models/qwen3-8-max"], ["GeekNews 정리", "https://news.hada.io/topic?id=32216"]]
  ],
  incident: [
    [["OpenAI 직원 Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"], ["Axios 사건 보도", "https://www.axios.com/2026/08/06/openai-hugging-face-black-hat"], ["OpenAI 관련 Threads 정리", "https://www.threads.com/share/EwI1BfLl3/"]],
    [["OpenAI 직원 Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"], ["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"]],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], ["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"]],
    [["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"], ["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"]],
    [["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"], ["Axios 사건 보도", "https://www.axios.com/2026/08/06/openai-hugging-face-black-hat"]],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], ["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"]],
    [["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"], ["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"]],
    [["OpenAI 사고 보고서", "https://openai.com/index/hugging-face-model-evaluation-security-incident/"], ["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"]],
    [["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"], ["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"]],
    [["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"], ["Axios 사건 보도", "https://www.axios.com/2026/08/06/openai-hugging-face-black-hat"]],
    [["Hugging Face 사고 보고서", "https://huggingface.co/blog/security-incident-july-2026"], ["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"]],
    [["Black Hat 발표 전사", "https://lilys.ai/digest/10858726/12763231?s=1&noteVersionId=9351871"], ["Axios 사건 보도", "https://www.axios.com/2026/08/06/openai-hugging-face-black-hat"]]
  ]
};
