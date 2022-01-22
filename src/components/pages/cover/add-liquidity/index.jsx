import { useState } from "react";
import { useRouter } from "next/router";

import { useCoverInfo } from "@/components/pages/cover/useCoverInfo";

import { AcceptRulesForm } from "@/components/UI/organisms/accept-rules-form";
import { CoverRules } from "@/components/common/CoverRules";
import { ProvideLiquidityForm } from "@/components/UI/organisms/cover-form/ProvideLiquidityForm";
import { CoverActionsFooter } from "@/components/UI/organisms/cover/actions-footer";
import { Container } from "@/components/UI/atoms/container";
import { SeeMoreParagraph } from "@/components/UI/molecules/SeeMoreParagraph";
import { CoverProfileInfo } from "@/components/common/CoverProfileInfo";
import { BreadCrumbs } from "@/components/UI/atoms/breadcrumbs";
import { Hero } from "@/components/UI/molecules/Hero";
import { getCoverImgSrc, toBytes32 } from "@/src/helpers/cover";
import { CoverPurchaseResolutionSources } from "@/components/UI/organisms/cover/purchase/resolution-sources";
import BigNumber from "bignumber.js";
import { sumOf, weiAsAmount } from "@/utils/bn";
import { useMyLiquidityInfo } from "@/src/hooks/provide-liquidity/useMyLiquidityInfo";

export const CoverAddLiquidityDetailsPage = () => {
  const [acceptedRules, setAcceptedRules] = useState(false);

  const router = useRouter();
  const { cover_id } = router.query;
  const coverKey = toBytes32(cover_id);
  const { coverInfo } = useCoverInfo(coverKey);
  const { info } = useMyLiquidityInfo({ coverKey });

  const handleAcceptRules = () => {
    setAcceptedRules(true);
  };

  if (!coverInfo) {
    return <>loading...</>;
  }

  const imgSrc = getCoverImgSrc(coverInfo);

  const totalLiquidity = sumOf(info.balance, info.extendedBalance);
  const myLiquidity = BigNumber(info.myShare);
  const myEarnings = myLiquidity.minus(
    BigNumber(info.myDeposits).minus(BigNumber(info.myWithdrawals))
  );
  const reassuranceAmount = info.totalReassurance;

  return (
    <>
      <Hero>
        <Container className="px-2 py-20">
          <BreadCrumbs
            pages={[
              { name: "Home", href: "/", current: false },
              { name: coverInfo?.coverName, current: false },
              { name: "Provide Liquidity", href: "#", current: true },
            ]}
          />
          <div className="flex">
            <CoverProfileInfo
              imgSrc={imgSrc}
              projectName={coverInfo?.coverName}
              links={coverInfo?.links}
            />
          </div>
        </Container>
      </Hero>

      {/* Content */}
      <div className="pt-12 pb-24 border-t border-t-B0C4DB">
        <Container className="grid gap-32 grid-cols-3">
          <div className="col-span-2">
            {/* Description */}
            <SeeMoreParagraph text={coverInfo.about}></SeeMoreParagraph>

            {acceptedRules ? (
              <div className="mt-12">
                <ProvideLiquidityForm coverKey={coverKey} />
              </div>
            ) : (
              <>
                <CoverRules rules={coverInfo?.rules} />
                <br className="mt-20" />
                <AcceptRulesForm onAccept={handleAcceptRules}>
                  I have read, understood, and agree to the terms of cover rules
                </AcceptRulesForm>
              </>
            )}
          </div>

          <CoverPurchaseResolutionSources
            projectName={coverInfo.projectName}
            knowledgebase={coverInfo?.resolutionSources[1]}
            twitter={coverInfo?.resolutionSources[0]}
          >
            <hr className="mt-4 mb-6 border-t border-B0C4DB/60" />
            <div className="flex justify-between pb-2">
              <span className="">Total Liquidity:</span>
              <strong className="text-right font-bold">
                $ {weiAsAmount(totalLiquidity)}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="">Reassurance:</span>
              <strong className="text-right font-bold">
                $ {weiAsAmount(reassuranceAmount)}
              </strong>
            </div>
          </CoverPurchaseResolutionSources>
        </Container>
      </div>

      <CoverActionsFooter activeKey="add-liquidity" />
    </>
  );
};