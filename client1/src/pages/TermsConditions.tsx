// src/pages/TermsConditions.tsx
import React from 'react';
import '../styles/pages/terms-conditions.css';

const TermsConditions: React.FC = () => {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h1 className="terms-title">Termos e Condições</h1>
        
        <div className="terms-section">
          <h2>1. Introdução</h2>
          <p>
            Bem-vindo aos Termos e Condições da Santiclinic. Ao aceder e utilizar os nossos serviços, 
            incluindo o nosso website e o serviço Mummy DayCare, concorda com estes termos e condições 
            na íntegra. Se não concordar com estes termos e condições ou qualquer parte destes, 
            não deve utilizar os nossos serviços.
          </p>
        </div>

        <div className="terms-section">
          <h2>2. Definições</h2>
          <p>Nestes termos e condições, os seguintes termos têm os seguintes significados:</p>
          <ul>
            <li>
              <strong>"Santiclinic", "nós", "nos"</strong> refere-se à clínica Santiclinic.
            </li>
            <li>
              <strong>"Serviço", "Serviços"</strong> refere-se a todos os serviços oferecidos pela Santiclinic, 
              incluindo, mas não limitado a, tratamentos estéticos, consultas, o serviço Mummy DayCare, 
              e o acesso e utilização do website.
            </li>
            <li>
              <strong>"Utilizador", "Cliente", "você"</strong> refere-se a qualquer pessoa que aceda ao 
              website ou utilize os serviços da Santiclinic.
            </li>
            <li>
              <strong>"Website"</strong> refere-se ao website da Santiclinic acessível em www.santiclinic.pt.
            </li>
            <li>
              <strong>"Mummy DayCare"</strong> refere-se ao serviço específico oferecido pela Santiclinic 
              para cuidados maternos.
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>3. Prestação de Serviços</h2>
          <p>
            A Santiclinic oferece uma variedade de serviços de cuidados de saúde e estética, incluindo o 
            serviço Mummy DayCare. Todos os serviços são prestados por profissionais qualificados de acordo 
            com as normas e regulamentos aplicáveis em Portugal.
          </p>
          <p>
            Reservamo-nos o direito de recusar a prestação de serviços a qualquer utilizador por qualquer 
            motivo, incluindo, mas não limitado a, comportamento inadequado, não comparecimento a consultas 
            anteriores sem aviso prévio, ou condições médicas que contraindiquem os nossos tratamentos.
          </p>
        </div>

        <div className="terms-section">
          <h2>4. Reservas e Cancelamentos</h2>
          <p>
            As reservas para os nossos serviços, incluindo o Mummy DayCare, podem ser feitas através do 
            nosso website, por telefone, ou presencialmente na nossa clínica.
          </p>
          <p>
            Política de Cancelamento:
          </p>
          <ul>
            <li>
              Os cancelamentos devem ser feitos com pelo menos 24 horas de antecedência.
            </li>
            <li>
              Cancelamentos com menos de 24 horas de antecedência ou não comparecimento podem estar 
              sujeitos a uma taxa de cancelamento de 50% do valor do serviço agendado.
            </li>
            <li>
              Em caso de emergência ou circunstâncias atenuantes, a taxa de cancelamento pode ser dispensada 
              a critério da Santiclinic.
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>5. Pagamentos</h2>
          <p>
            Todos os preços dos nossos serviços estão indicados em euros e incluem IVA à taxa legal em vigor.
          </p>
          <p>
            Aceitamos pagamentos através dos seguintes métodos:
          </p>
          <ul>
            <li>Cartão de crédito/débito</li>
            <li>Transferência bancária</li>
            <li>Dinheiro (apenas para pagamentos presenciais)</li>
            <li>Sistemas de pagamento online seguros</li>
          </ul>
          <p>
            Para o serviço Mummy DayCare, pode ser solicitado um depósito no momento da reserva para 
            garantir a sua vaga. Este depósito é reembolsável apenas em caso de cancelamento com pelo 
            menos 48 horas de antecedência.
          </p>
        </div>

        <div className="terms-section">
          <h2>6. Pacotes Promocionais</h2>
          <p>
            Os pacotes promocionais, incluindo ofertas especiais para o Mummy DayCare, estão sujeitos 
            a disponibilidade e podem ser limitados no tempo. As promoções não são cumulativas com outras 
            ofertas, a menos que especificamente indicado.
          </p>
          <p>
            Os vouchers promocionais têm um período de validade específico e devem ser utilizados dentro 
            desse período. Não são reembolsáveis nem transferíveis.
          </p>
        </div>

        <div className="terms-section">
          <h2>7. Uso do Website</h2>
          <p>
            O conteúdo do nosso website é apenas para informação geral e não constitui aconselhamento 
            médico. Embora nos esforcemos para manter as informações atualizadas e corretas, não fazemos 
            representações ou garantias de qualquer tipo, expressas ou implícitas, sobre a integridade, 
            precisão, confiabilidade, adequação ou disponibilidade do website ou das informações, produtos, 
            serviços, ou imagens relacionadas contidas no website.
          </p>
          <p>
            O uso de qualquer informação ou materiais no nosso website é inteiramente por sua conta e risco, 
            pelo que não seremos responsáveis. É da sua responsabilidade garantir que quaisquer produtos, 
            serviços ou informações disponíveis através do nosso website atendem aos seus requisitos específicos.
          </p>
        </div>

        <div className="terms-section">
          <h2>8. Propriedade Intelectual</h2>
          <p>
            Todo o conteúdo do nosso website, incluindo, mas não limitado a, textos, gráficos, logótipos, 
            ícones, imagens, clipes de áudio, downloads digitais, compilações de dados e software, é 
            propriedade da Santiclinic ou dos nossos fornecedores de conteúdo e está protegido pelas leis 
            de direitos autorais portuguesas e internacionais.
          </p>
          <p>
            A reprodução, modificação, distribuição ou republicação de materiais do nosso website para 
            qualquer fim sem o nosso consentimento prévio por escrito é estritamente proibida.
          </p>
        </div>

        <div className="terms-section">
          <h2>9. Limitação de Responsabilidade</h2>
          <p>
            Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, 
            consequenciais, especiais ou exemplares decorrentes ou de qualquer forma relacionados com:
          </p>
          <ul>
            <li>O uso ou incapacidade de usar o nosso website ou serviços</li>
            <li>Acesso não autorizado ou alteração das suas transmissões ou dados</li>
            <li>Declarações ou conduta de terceiros no nosso website</li>
            <li>Resultados de tratamentos que possam variar de pessoa para pessoa</li>
            <li>Quaisquer outras questões relacionadas com o nosso website ou serviços</li>
          </ul>
        </div>

        <div className="terms-section">
          <h2>10. Indemnização</h2>
          <p>
            Concorda em indemnizar, defender e isentar a Santiclinic e os seus funcionários, diretores, 
            agentes, contratados e licenciadores de e contra quaisquer reclamações, responsabilidades, 
            danos, perdas e despesas, incluindo, sem limitação, honorários e custos legais razoáveis, 
            decorrentes de qualquer forma ou relacionados com o seu acesso ou uso do nosso website ou 
            serviços, ou a sua violação destes Termos e Condições.
          </p>
        </div>

        <div className="terms-section">
          <h2>11. Lei Aplicável</h2>
          <p>
            Estes Termos e Condições são regidos e interpretados de acordo com as leis de Portugal, e 
            quaisquer disputas relacionadas com estes termos e condições estarão sujeitas à jurisdição 
            exclusiva dos tribunais portugueses.
          </p>
        </div>

        <div className="terms-section">
          <h2>12. Alterações aos Termos e Condições</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos e condições a qualquer momento. As alterações 
            entrarão em vigor imediatamente após a publicação dos termos e condições atualizados no nosso 
            website. O seu uso continuado do website ou dos nossos serviços após a publicação de quaisquer 
            alterações aos termos e condições constitui a sua aceitação dessas alterações.
          </p>
        </div>

        <div className="terms-section">
          <h2>13. Contacto</h2>
          <p>
            Se tiver alguma dúvida sobre estes Termos e Condições, por favor contacte-nos:
          </p>
          <div className="contact-details">
            <p><strong>Santiclinic</strong></p>
            <p>Praceta Agostinho Ferreira Chaves 5,</p>
            <p>Lj 4AA,8005-328 Faro, Portugal</p>
            <p>Email: <a href="mailto:info@santiclinic.pt">geral@santiclinic.eu</a></p>
            <p>Telefone: +351 915 007 427</p>
          </div>
        </div>

        <div className="terms-footer">
          <p>Última atualização: 27 de abril de 2025</p>
          <a href="/" className="back-button">Voltar para a página inicial</a>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;