import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Figma MCP Magic",
  description:
    "Privacy Policy for Figma MCP Magic - How we handle your data and privacy",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          Privacy Policy
        </h1>

        {/* English Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">English</h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-white/80 leading-relaxed">
              This application ("MCP Magic") is a developer tool that integrates
              with Figma via official APIs. While the app communicates with
              Figma's servers to access design data, it does not collect, store,
              or share your personal information.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Data Handling:
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                <li>
                  We do not collect any personal information beyond what's
                  necessary for Figma API integration
                </li>
                <li>
                  We do not track your usage patterns or behavior
                </li>
                <li>
                  We do not store any design data or personal information
                  locally
                </li>
                <li>
                  All communication with Figma uses their official, secure APIs
                </li>
                <li>We do not share any information with third parties</li>
                <li>
                  We do not access your Body and Surroundings data
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Network Activity:
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                <li>
                  The app connects to Figma's official API servers to retrieve
                  design information
                </li>
                <li>All connections use secure HTTPS protocols</li>
                <li>
                  The app uses Google Analytics for performance monitoring and
                  crash reporting only
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                Analytics and Diagnostics:
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                <li>
                  We collect anonymous usage analytics to improve app
                  performance and stability
                </li>
                <li>
                  Crash reports are automatically sent to help us fix bugs
                </li>
                <li>
                  No personally identifiable information is included in
                  analytics data
                </li>
                <li>You can disable analytics in the app settings</li>
                <li>
                  Analytics data is processed by Google Analytics in accordance
                  with their privacy policy
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-16"></div>

        {/* Korean Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Korean (한국어)
          </h2>

          <div className="prose prose-invert max-w-none space-y-6">
            <p className="text-white/80 leading-relaxed">
              이 애플리케이션("MCP Magic")은 Figma 공식 API를 통해 통합되는
              개발자 도구입니다. 앱이 디자인 데이터에 접근하기 위해 Figma
              서버와 통신하지만, 개인 정보를 수집, 저장 또는 공유하지 않습니다.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                데이터 처리:
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                <li>
                  Figma API 통합에 필요한 정보 이외의 개인 정보는 수집하지
                  않습니다
                </li>
                <li>
                  사용자의 사용 패턴이나 행동을 추적하지 않습니다
                </li>
                <li>
                  디자인 데이터나 개인 정보를 로컬에 저장하지 않습니다
                </li>
                <li>
                  모든 Figma 통신은 공식적이고 안전한 API를 사용합니다
                </li>
                <li>제3자와 어떠한 정보도 공유하지 않습니다</li>
                <li>Body 및 Surroundings 데이터에 접근하지 않습니다</li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                네트워크 활동:
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                <li>
                  앱은 디자인 정보를 가져오기 위해 Figma 공식 API 서버에
                  연결됩니다
                </li>
                <li>모든 연결은 안전한 HTTPS 프로토콜을 사용합니다</li>
                <li>
                  앱은 성능 모니터링과 크래시 리포팅을 위해서만 Google
                  Analytics를 사용합니다
                </li>
              </ul>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-4">
                분석 및 진단:
              </h3>
              <ul className="space-y-2 text-white/80 list-disc list-inside">
                <li>
                  앱 성능과 안정성 향상을 위해 익명의 사용 분석 데이터를
                  수집합니다
                </li>
                <li>
                  버그 수정을 위해 크래시 리포트가 자동으로 전송됩니다
                </li>
                <li>
                  분석 데이터에는 개인 식별 정보가 포함되지 않습니다
                </li>
                <li>앱 설정에서 분석 기능을 비활성화할 수 있습니다</li>
                <li>
                  분석 데이터는 Google Analytics 개인정보처리방침에 따라
                  처리됩니다
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Last Updated */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-sm text-white/60 text-center">
            Last updated: August 29th 2025
          </p>
        </div>
      </div>
    </div>
  );
}

