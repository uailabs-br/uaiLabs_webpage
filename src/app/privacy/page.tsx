import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy / Política de Privacidade — uaiLabs",
  description:
    "How uaiLabs handles your data. Como a uaiLabs trata seus dados.",
  alternates: { canonical: "https://uailabs.vercel.app/privacy" },
};

const UPDATED = "June 19, 2026";
const EMAIL = "uailabs.br@gmail.com";

export default function PrivacyPage() {
  return (
    <main className="container-site mx-auto max-w-2xl py-24 md:py-32">
      <Link
        href="/"
        className="font-mono text-[12px] uppercase tracking-[0.15em] text-text-2 transition-colors duration-300 hover:text-text"
      >
        ← uaiLabs
      </Link>

      {/* ── Português ─────────────────────────────────── */}
      <section className="mt-12">
        <h1 className="text-h2 text-text">Política de Privacidade</h1>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.15em] text-text-2">
          Última atualização: 19 de junho de 2026
        </p>

        <div className="mt-8 flex flex-col gap-6 text-body text-text-2">
          <p>
            A uaiLabs (&ldquo;nós&rdquo;) respeita a sua privacidade. Esta
            política explica quais dados coletamos e como os tratamos, em
            conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº
            13.709/2018).
          </p>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              Dados que coletamos
            </h2>
            <p className="mt-2">
              Este site não possui formulários e não coleta dados pessoais
              automaticamente além dos registros técnicos padrão do servidor de
              hospedagem (endereço IP, tipo de navegador e horário de acesso),
              usados apenas para segurança e funcionamento do site. Se você nos
              contatar por e-mail, receberemos os dados que você decidir
              compartilhar (nome, e-mail e o conteúdo da mensagem).
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              Como usamos os dados
            </h2>
            <p className="mt-2">
              Utilizamos os dados de contato exclusivamente para responder à sua
              solicitação e dar andamento a uma eventual conversa ou projeto. Não
              vendemos, alugamos nem compartilhamos seus dados com terceiros para
              fins de marketing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              Seus direitos
            </h2>
            <p className="mt-2">
              Você pode solicitar a qualquer momento o acesso, a correção ou a
              exclusão dos seus dados, bem como informações sobre o tratamento.
              Para isso, escreva para{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-tertiary transition-colors hover:text-text"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              Contato
            </h2>
            <p className="mt-2">
              Dúvidas sobre esta política podem ser enviadas para{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-tertiary transition-colors hover:text-text"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <hr className="my-14 border-text-3/40" />

      {/* ── English ───────────────────────────────────── */}
      <section>
        <h1 className="text-h2 text-text">Privacy Policy</h1>
        <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.15em] text-text-2">
          Last updated: {UPDATED}
        </p>

        <div className="mt-8 flex flex-col gap-6 text-body text-text-2">
          <p>
            uaiLabs (&ldquo;we&rdquo;) respects your privacy. This policy
            explains what data we collect and how we handle it.
          </p>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              Data we collect
            </h2>
            <p className="mt-2">
              This site has no forms and does not automatically collect personal
              data beyond standard hosting server logs (IP address, browser type,
              and access time), used solely for site security and operation. If
              you contact us by email, we receive the data you choose to share
              (name, email, and the content of your message).
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              How we use data
            </h2>
            <p className="mt-2">
              We use contact data only to respond to your request and to move a
              potential conversation or project forward. We do not sell, rent, or
              share your data with third parties for marketing.
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-text">
              Your rights
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or deletion of your data
              at any time. Write to{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-tertiary transition-colors hover:text-text"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="font-display text-lg font-bold text-text">Contact</h2>
            <p className="mt-2">
              Questions about this policy can be sent to{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-tertiary transition-colors hover:text-text"
              >
                {EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
