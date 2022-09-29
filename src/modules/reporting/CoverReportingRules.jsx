import { CoverRules } from '@/common/CoverRules/CoverRules'
import { ReportingInfo } from './ReportingInfo'
import { Alert } from '@/common/Alert/Alert'
import { Container } from '@/common/Container/Container'
import { AcceptReportRulesForm } from '@/common/AcceptCoverRulesForm/AcceptReportRulesForm'
import { CoverResolutionSources } from '@/common/Cover/CoverResolutionSources'
import { Trans } from '@lingui/macro'
import { useCoverStatsContext } from '@/common/Cover/CoverStatsContext'
import { toBN } from '@/utils/bn'
import { MULTIPLIER } from '@/src/config/constants'
import { isValidProduct } from '@/src/helpers/cover'

export const CoverReportingRules = ({
  coverInfo,
  handleAcceptRules,
  activeReportings
}) => {
  const { reporterCommission } = useCoverStatsContext()
  const hasActiveReportings = activeReportings && activeReportings.length > 0
  const isDiversified = isValidProduct(coverInfo.productKey)

  return (
    <>
      {/* Content */}
      <div className='pt-12 pb-24 border-t border-t-B0C4DB'>
        <Container className='grid grid-cols-3 md:gap-32'>
          <div className='col-span-3 row-start-3 md:col-span-2 md:row-start-auto'>
            {/* Rules */}
            <CoverRules rules={coverInfo?.infoObj.rules} />
            <div>
              <AcceptReportRulesForm onAccept={handleAcceptRules}>
                <div className='mt-16'>
                  <h2 className='mb-6 font-bold font-sora text-h2'>
                    <Trans>Active Reporting</Trans>
                  </h2>

                  {!hasActiveReportings && (
                    <p className='mb-10 text-h4 text-8F949C'>
                      <Trans>
                        There are no known incidents of {isDiversified ? coverInfo.infoObj.productName : coverInfo.infoObj.coverName}.
                      </Trans>
                    </p>
                  )}

                  {hasActiveReportings && (
                    <div className='mb-10'>
                      {activeReportings.map((x) => {
                        return (
                          <ReportingInfo key={x.id} ipfsHash={x.reporterInfo} />
                        )
                      })}
                    </div>
                  )}

                  <Alert>
                    <Trans>
                      If you just came to know about a recent incident of{' '}
                      {isDiversified ? coverInfo.infoObj.productName : coverInfo.infoObj.coverName}, carefully read the cover rules
                      above. You can earn flat{' '}
                      {toBN(reporterCommission)
                        .multipliedBy(100)
                        .dividedBy(MULTIPLIER)
                        .toString()}
                      % of the minority fees if you are the first person to
                      report this incident.
                    </Trans>
                  </Alert>
                </div>
              </AcceptReportRulesForm>
            </div>
          </div>
          <CoverResolutionSources coverInfo={coverInfo}>
            {/* <Link href="#">
              <a className="block mt-3 text-4e7dd9 hover:underline">
                <Trans>Neptune Mutual Reporters</Trans>
              </a>
            </Link> */}
          </CoverResolutionSources>
        </Container>
      </div>
    </>
  )
}
