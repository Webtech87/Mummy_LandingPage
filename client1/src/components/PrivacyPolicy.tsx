// src/pages/PrivacyPolicy.tsx
import React from 'react';
import '../styles/components/privacy-policy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-policy-content">
        <h1 className="privacy-policy-title">Política de Privacidade</h1>
        
        <div className="privacy-policy-section">
          <h2>1. Introdução</h2>
          <p>
            Bem-vindo à Política de Privacidade da Santiclinic. Agradecemos por utilizar nossos 
            serviços e confiança. Respeitamos a sua privacidade e estamos comprometidos 
            em proteger seus dados pessoais.
          </p>
          <p>
            Esta política de privacidade descreve como recolhemos, utilizamos e protegemos as suas 
            informações quando utiliza o nosso website e os nossos serviços, incluindo o serviço Mummy DayCare.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>2. Dados que Recolhemos</h2>
          <p>Podemos recolher os seguintes tipos de informações:</p>
          <ul>
            <li>
              <strong>Informações de Identificação Pessoal:</strong> Nome completo, endereço, 
              número de telefone, endereço de e-mail.
            </li>
            <li>
              <strong>Informações de Saúde:</strong> Histórico médico relevante para os nossos serviços.
            </li>
            <li>
              <strong>Informações de Pagamento:</strong> Detalhes de cartão de crédito/débito ou outras 
              informações financeiras necessárias para processar pagamentos.
            </li>
            <li>
              <strong>Informações Técnicas:</strong> Endereço IP, tipo de navegador, provedor de 
              serviços de Internet, páginas de referência/saída, sistema operacional.
            </li>
            <li>
              <strong>Informações de Utilização:</strong> Como interage com o nosso website, 
              incluindo as páginas visitadas, tempo gasto no site, cliques.
            </li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2>3. Como Utilizamos os Seus Dados</h2>
          <p>Utilizamos os seus dados pessoais para os seguintes propósitos:</p>
          <ul>
            <li>Fornecer e gerir os nossos serviços, incluindo o serviço Mummy DayCare</li>
            <li>Processar pagamentos e gerir a sua conta</li>
            <li>Enviar comunicações sobre os nossos serviços</li>
            <li>Responder às suas perguntas e solicitações</li>
            <li>Melhorar o nosso website e os nossos serviços</li>
            <li>Cumprir obrigações legais</li>
            <li>Para fins de pesquisa e análise</li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2>4. Base Legal para o Processamento de Dados</h2>
          <p>
            Processamos os seus dados pessoais apenas quando temos uma base legal válida para o fazer, 
            que pode incluir:
          </p>
          <ul>
            <li>O seu consentimento</li>
            <li>A necessidade de executar um contrato consigo</li>
            <li>Cumprimento das nossas obrigações legais</li>
            <li>Os nossos interesses legítimos (desde que não prejudiquem os seus direitos)</li>
            <li>Para proteger os seus interesses vitais ou os de outra pessoa</li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2>5. Partilha de Dados Pessoais</h2>
          <p>
            Podemos partilhar os seus dados pessoais com terceiros nas seguintes circunstâncias:
          </p>
          <ul>
            <li>Com prestadores de serviços que nos ajudam a fornecer os nossos serviços</li>
            <li>Com parceiros de negócios com quem oferecemos produtos ou serviços em conjunto</li>
            <li>Quando exigido por lei ou por autoridades governamentais</li>
            <li>Para proteger os nossos direitos, propriedade ou segurança, ou os de outros</li>
            <li>No caso de uma fusão, venda ou reorganização do nosso negócio</li>
          </ul>
          <p>
            Não vendemos os seus dados pessoais a terceiros.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>6. Segurança de Dados</h2>
          <p>
            Implementamos medidas de segurança apropriadas para proteger os seus dados pessoais 
            contra acesso não autorizado, alteração, divulgação ou destruição. Estas medidas incluem:
          </p>
          <ul>
            <li>Encriptação de dados sensíveis</li>
            <li>Firewalls e sistemas de deteção de intrusões</li>
            <li>Acesso restrito a dados pessoais</li>
            <li>Monitorização regular dos nossos sistemas</li>
            <li>Formação em segurança para o nosso pessoal</li>
          </ul>
        </div>

        <div className="privacy-policy-section">
          <h2>7. Os Seus Direitos</h2>
          <p>
            Ao abrigo do Regulamento Geral de Proteção de Dados (RGPD) e outras leis de proteção de dados aplicáveis, 
            tem os seguintes direitos:
          </p>
          <ul>
            <li>Direito de acesso aos seus dados pessoais</li>
            <li>Direito de retificação de dados inexatos</li>
            <li>Direito de apagamento (direito a ser esquecido)</li>
            <li>Direito à limitação do processamento</li>
            <li>Direito à portabilidade dos dados</li>
            <li>Direito de oposição ao processamento</li>
            <li>Direito de não estar sujeito a decisões automatizadas, incluindo a definição de perfis</li>
          </ul>
          <p>
            Para exercer qualquer um destes direitos, por favor contacte-nos através do email 
            <a href="mailto:geral@santiclinic.eu"> geral@santiclinic.eu</a>.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>8. Cookies e Tecnologias Semelhantes</h2>
          <p>
            Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência no nosso website, 
            analisar o tráfego e personalizar o conteúdo. Pode gerir as suas preferências de cookies 
            através das definições do seu navegador.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>9. Período de Conservação de Dados</h2>
          <p>
            Conservamos os seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
            para as quais foram recolhidos, incluindo para fins de cumprimento de requisitos legais, 
            contabilísticos ou de relatórios.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>10. Transferências Internacionais de Dados</h2>
          <p>
            Os seus dados pessoais podem ser transferidos para, e processados em, países fora do 
            Espaço Económico Europeu (EEE). Nestes casos, tomaremos medidas para garantir que os seus 
            dados recebem um nível de proteção adequado.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>11. Alterações a Esta Política de Privacidade</h2>
          <p>
            Podemos atualizar esta política de privacidade periodicamente para refletir alterações nas 
            nossas práticas de privacidade. Publicaremos a política de privacidade atualizada no nosso 
            website e, se as alterações forem significativas, notificá-lo-emos por email ou através 
            de um aviso no nosso website.
          </p>
        </div>

        <div className="privacy-policy-section">
          <h2>12. Contacte-nos</h2>
          <p>
            Se tiver alguma pergunta sobre esta política de privacidade ou sobre como tratamos os seus 
            dados pessoais, por favor contacte-nos:
          </p>
          <div className="contact-details">
            <p><strong>Santiclinic</strong></p>
            <p>Praceta Agostinho Ferreira Chaves 5</p>
            <p>Lj 4 AA,8005-328 Faro, Portugal</p>
            <p>Email: <a href="mailto:geral@santiclinic.eu">geral@santiclinic.eu</a></p>
            <p>Telefone: +351 915 007 427</p>
          </div>
        </div>

        <div className="privacy-policy-footer">
          <p>Última atualização: 27 de abril de 2025</p>
          <a href="/" className="back-button">Voltar para a página inicial</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;