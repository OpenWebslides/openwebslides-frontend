// @flow

import * as React from 'react';
import { withNamespaces, type TranslatorProps } from 'react-i18next';
import { Card } from 'semantic-ui-react';

import ContainerPageWrapper from 'components/ContainerPageWrapper';

type Props = {| ...TranslatorProps |};

const PureTosPage = (props: Props): React.Node => {
  const { t } = props;

  return (
    <ContainerPageWrapper>
      <Card centered={true} style={{ width: '800px' }}>
        <Card.Content>
          <Card.Header>
            {t('platform:tosCard.title')}
          </Card.Header>
          <Card.Description>
            {t('platform:tosCard.date')}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <h2>Definitions</h2>

          <p>
            <strong>Your (personal) data</strong> refers to any and all information you provide to us in the context of usage of the application. <strong>Content</strong> is any course content entered into the application, that includes but is not limited to annotations, comments, topics, contributions and updates. The <strong>application</strong> refers to the instance of the service provided for your usage at the web address <a href="https://openwebslid.es/">https://openwebslid.es/</a>. An <strong>account</strong> is the personal, non-alienable identifier the user utilizes to gain access to the application.
          </p>

          <h2>How does Open Webslides collect personal data?</h2>

          <p>
            Open Webslides collects personal data that you provide us by registering as a user
            on the application. Other data collected includes content you entered into
            the application. Additionally, some data may be gathered while you are using
            the application.
          </p>

          <h2>What kind of personal data does Open Webslides process?</h2>

          <p>
            Open Webslides collects personal data that is necessary to guarantee the functioning of
            the application. When you register as a user, regardless of the authentication method
            used (email, social media account or institutional login), you provide us with a
            <strong>name</strong> and an <strong>email address</strong>.
            You can choose to also provide <strong>age</strong>, <strong>gender</strong>,
            <strong>role</strong> as a user and <strong>country</strong> once you have registered.
            Furthermore, you can optionally also provide a <strong>locale</strong> on your account.
          </p>

          <h2>When and why does Open Webslides process personal data?</h2>

          <p>
            Open Webslides uses this data to enable use of the application. Your
            <strong>name</strong> and <strong>email address</strong> are visible to other users
            of the application. <strong>Age</strong>, <strong>gender</strong>,
            <strong>role</strong> and <strong>country</strong> are solely used for statistical
            purposes, and to let us improve the functioning of the application. Data for these
            purposes is always processed anonymously, and is not linked to your name or
            email address. All content you enter in the application is linked to your account.
            Your content may or may not be visible to other users on the application, dependent
            on the content privacy settings you use within the application.
          </p>

          <p>
            Your <strong>locale</strong> is used solely for determining the most applicable
            language, date, time and currency format the application will be displayed in, and
            will not be visible for anyone else but you.
          </p>

          <h2>How does Open Webslides deal with personal data?</h2>

          <p>
            Personal data is never made publicly accessible, and is not stored for longer
            than necessary. Your personal data will only be used in the context of the guaranteeing
            the functioning of the application. Open Webslides will never pass on your data to
            third parties without your explicit permission. We will never pass on your data to
            third parties for commercial purposes. Data for statistical purposes is shared
            with the partner institutions of the <a href="https://www.cocos.education/consortium-en/">CoCOS project</a>.
          </p>

          <h2>How long does Open Webslides store my data?</h2>

          <p>
            Open Webslides commits to not keeping your data longer than necessary.
            As long as you wish to use the application, the data will be retained.
          </p>

          <h2>Does Open Webslides store my data in a safe way?</h2>

          <p>
            All data is stored in a careful and safe manner. To this end, Open Webslides uses
            various security technologies and measure to adequately protect your data against
            unauthorized access, loss or disclosure. Open Webslides processes and manages data
            on infrastructure provided by <a href="https://www.ugent.be/">Ghent University</a>,
            where access is restricted for third parties. When data is shared with third parties,
            a data processing agreement is concluded with the party in which sufficient (technical)
            measures must always be included to ensure the continued security of your data.
          </p>

          <h2>What can I do myself in regard to my personal information?</h2>

          <p>
            You can view and edit your personal data that Open Webslides uses to guarantee
            the functioning of the application yourself on the <a href="https://openwebslid.es/user/settings">settings</a>
            page. Please note that content entered into the system will statically include
            the personal information from your account (<strong>name</strong> and
            <strong>email address</strong>), and modifying your personal information may not
            reflect on content already entered into the system. You have the right to be forgotten.
            If you wish to modify any inaccurate or incomplete content or data, please contact
            <a href="mailto:openwebslides@ugent.be">openwebslides@ugent.be</a>.
          </p>

          <p>
            Any questions or concerns? Do not hesitate to contact Open Webslides with questions about the privacy policy on <a href="mailto:openwebslides@ugent.be">openwebslides@ugent.be</a>.
          </p>
        </Card.Content>
      </Card>
    </ContainerPageWrapper>
  );
};

const TosPage = withNamespaces()(PureTosPage);

export { PureTosPage };
export default TosPage;
