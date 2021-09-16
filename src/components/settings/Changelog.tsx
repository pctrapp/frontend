import React, { FC } from 'react';
import styled from 'styled-components';

import { colors, typography } from '../../atoms/constans';
import { changelog, IChangelog } from '../../data/changelog';
import { formatInDate } from '../../lib/time';
import Badge from '../Badge';

const Changelog: FC = () => {
  function sortFunction(a: IChangelog, b: IChangelog): number {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  }

  return (
    <>
      <typography.h4>Changelog</typography.h4>
      {changelog.sort(sortFunction).map(({ badge, title, text, date }, id) => 
        <ChangelogEntry key={id}>
          <div>
            <Badge color={badge === 'bugfix' ? colors.RED : badge === 'feature' ? colors.GREEN : colors.BRAND}>
              {badge}
            </Badge>
          </div>
          <typography.pB margin=".25rem 0 0 0" color={colors.PRIM_TEXT_COLOR}>{title}</typography.pB>
          <typography.p>{text}</typography.p>
          <typography.s>
            <i>-- {formatInDate(date)}</i>
          </typography.s>
        </ChangelogEntry>
      )}
    </>
  )
}

const ChangelogEntry = styled.div`
  margin: 1rem 0;
`;

export default Changelog;